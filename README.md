# Dev Challenge Express ⚡

Retos técnicos rápidos (30–60 s) para developers en stands de eventos.
Creado como aplicación de comunidad para **AWS Girls Perú**.

No es un examen ni una plataforma educativa: la experiencia es rápida, divertida
y visual, pensada para usarse desde una **tablet** en el stand sin generar colas.

- 6 categorías: Cloud ☁️, Code `</>`, DevOps ⚙️, Security 🔐, GenAI 🤖, Boss Level 🔥
- Reto aleatorio por categoría (o "Sorpréndeme")
- Temporizador visible (no bloquea al llegar a cero)
- Sin login, sin backend, sin base de datos: se despliega como sitio estático
- Configurable por evento editando **un solo archivo**

---

## 1. Arquitectura propuesta

### MVP (actual)

```
Browser  ->  CloudFront (CDN + HTTPS)  ->  S3 (sitio estático privado)
```

- **Frontend**: React + TypeScript + Vite, compilado a HTML/CSS/JS estático.
- **Datos**: el banco de preguntas viaja dentro del bundle (sin llamadas de red).
- **Sin backend**: no hay API ni base de datos en el MVP.

### Capas internas (desacople para evolución futura)

```
UI (screens/components)
      │  (solo conoce el contexto y el repositorio)
      ▼
Estado global (useReducer + Context)  ──►  Analytics (interfaz intercambiable)
      │
      ▼
challengeRepository  ──►  banco de preguntas (bundle)   ← mañana: API / DynamoDB
```

La UI nunca importa los datos directamente: pasa por `challengeRepository`.
Cambiar la fuente de datos (a una API o DynamoDB) no requiere tocar componentes.

---

## 2. Estructura de carpetas

```
f13-summit/
├── index.html                # Punto de entrada
├── package.json
├── vite.config.ts            # Config de Vite + Vitest
├── tsconfig*.json
├── public/
│   └── favicon.svg
├── infra/                    # Terraform opcional (S3 + CloudFront)
│   ├── main.tf
│   ├── variables.tf
│   ├── outputs.tf
│   └── terraform.tfvars.example
└── src/
    ├── main.tsx              # Bootstrap de React
    ├── App.tsx               # Router de pantallas (máquina de estados)
    ├── vite-env.d.ts
    ├── types/                # Modelo de datos (Challenge, categorías, niveles)
    ├── config/
    │   ├── categories.ts     # Metadatos de las 6 categorías
    │   └── event.ts          # ⭐ EventConfig: cambiar de evento aquí
    ├── data/
    │   ├── challengeRepository.ts   # Acceso a preguntas (única puerta)
    │   └── challenges/              # Banco de preguntas (1 archivo por categoría)
    ├── lib/
    │   ├── random.ts         # Selección aleatoria (pura, testeable)
    │   ├── analytics.ts      # Abstracción de analytics
    │   └── labels.ts         # Etiquetas legibles (nivel/tipo)
    ├── hooks/
    │   └── useCountdown.ts   # Temporizador
    ├── state/
    │   ├── appState.ts       # Reducer + acciones
    │   └── AppProvider.tsx   # Context + acciones de alto nivel
    ├── components/           # Botón, layout, timer, chip, badge, QR
    ├── screens/              # Home, Categorías, Challenge, Respuesta, Final
    └── styles/global.css     # Tema morado/violeta/magenta + tokens
```

---

## 3. Modelo de datos

Definido en `src/types/challenge.ts`:

```typescript
type ChallengeCategory = 'cloud' | 'code' | 'devops' | 'security' | 'genai' | 'boss';
type ChallengeLevel = 'easy' | 'medium' | 'advanced';
type ChallengeType = 'multiple-choice' | 'true-false' | 'open' | 'debug' | 'architecture';

interface Challenge {
  id: string;
  category: ChallengeCategory;
  level: ChallengeLevel;
  type: ChallengeType;
  question: string;
  code?: string;                 // bloque de código opcional (se separa del enunciado)
  language?: CodeLanguage;       // lenguaje del bloque, para el resaltado
  options?: string[];
  answer: string;
  acceptedAnswers?: string[];
  explanation: string;
  keyConcept?: string;
  timeLimit: number;
}
```

> Los tipos del enunciado "¿Qué servicio usarías?" y "¿Qué harías?" se modelan
> como `open` (respuesta abierta/recomendada), ya que comparten la misma UI.

### Preguntas con código

Cuando un reto (típicamente `debug`) incluye código, se pone en el campo `code`
—separado del enunciado en prosa— con su `language`. La pantalla lo renderiza en
un bloque con **resaltado de sintaxis** propio (sin librerías externas, para no
inflar el bundle). Lenguajes soportados: `javascript`, `typescript`, `python`,
`bash`, `json`, `yaml`, `plaintext`. Ejemplo:

```typescript
{
  type: 'debug',
  question: 'Este código imprime siempre 4 en lugar de 1, 2, 3. ¿Por qué?',
  code: 'for (var i = 1; i <= 3; i++) {\n  setTimeout(() => console.log(i));\n}',
  language: 'javascript',
  answer: 'var no tiene ámbito de bloque; usar let',
  // ...
}
```

Tiempos: `easy` y `medium` = 30 s; Boss Level (`advanced`) = 60 s.

---

## 4. Componentes principales

| Componente | Rol |
|---|---|
| `App` / `ScreenRouter` | Renderiza la pantalla según el estado (`home`, `categories`, `challenge`, `answer`, `final`). |
| `AppProvider` / `useApp` | Estado global y acciones (`start`, `selectCategory`, `revealAnswer`, `nextChallenge`, `changeCategory`, `finish`, `reset`). |
| `HomeScreen` | Pantalla 1: título + tagline + "Aceptar el reto". |
| `CategoriesScreen` | Pantalla 2: 6 cards + "Sorpréndeme". |
| `ChallengeScreen` | Pantalla 3: categoría, nivel, pregunta, opciones, temporizador, "Ver respuesta". |
| `AnswerScreen` | Pantalla 4: respuesta, explicación, concepto, alternativas + acciones. |
| `FinalScreen` | Pantalla 5: mensaje final, QR opcional, "Nuevo participante". |
| `Timer` | Cuenta regresiva visual (no bloquea al expirar). |
| `SessionBadge` | Contador local de retos completados. |
| `QrCode` | QR configurable hacia la comunidad. |

---

## 5. Banco de preguntas

- 60 preguntas iniciales: **10 por categoría**.
- Un archivo por categoría en `src/data/challenges/`.
- Totalmente desacopladas de la UI.

Para **agregar o editar** preguntas: edita el archivo de la categoría
correspondiente (por ejemplo `src/data/challenges/cloud.ts`) respetando el
tipo `Challenge`. No hace falta tocar ningún componente.

---

## 6. Configuración del evento (Modo evento)

Edita **solo** `src/config/event.ts`:

```typescript
export const EVENT_CONFIG: EventConfig = {
  eventName: 'F13 Code Summit 2026',
  communityName: 'AWS Girls Perú',
  meetupUrl: 'https://www.meetup.com/...',
  linkedinUrl: 'https://www.linkedin.com/...',
  instagramUrl: 'https://www.instagram.com/...',
  qrUrl: 'https://linktr.ee/...', // QR de la pantalla final (opcional)
};
```

Si `qrUrl` se omite, la pantalla final no muestra QR. Ningún componente
hardcodea el nombre del evento ni los enlaces.

---

## 7. Analytics

Abstracción en `src/lib/analytics.ts`. En el MVP registra en consola
(`console.debug`, no persistente, **sin datos personales**). Eventos:

- `category_selected`
- `challenge_started`
- `answer_revealed`
- `challenge_completed`
- `session_finished`

Para enviar a un destino real (CloudWatch, API propia), implementa la interfaz
`Analytics` y reemplaza la instancia exportada; el resto de la app no cambia.

---

## 8. Accesibilidad

- Navegación por teclado y `:focus-visible` global.
- Alto contraste y tamaños táctiles mínimos (`--touch-target: 56px`).
- `aria-label` en botones/cards y `role="timer"` con `aria-live`.
- No se depende solo del color (el temporizador también muestra texto "¡Tiempo!").
- Respeta `prefers-reduced-motion`.

> La validación completa de WCAG requiere pruebas manuales con tecnologías de
> asistencia y revisión experta de accesibilidad.

---

## 9. Desarrollo local

Requisitos: **Node.js 18+** y npm.

```bash
npm install      # instalar dependencias
npm run dev      # servidor de desarrollo (http://localhost:5173)
```

> Nota: ejecuta `npm run dev` en tu propia terminal (es un proceso de larga
> duración). El servidor de desarrollo de Vite/esbuild tiene advisories de
> seguridad conocidos que afectan **solo al entorno de desarrollo**; el sitio
> estático publicado no incluye ese servidor, por lo que no aplican en producción.

### Tests

```bash
npm test              # ejecuta la suite una vez
npm run test:watch    # modo watch
npm run test:coverage # con cobertura
```

Cubren: selección aleatoria, no repetir el reto inmediato, el temporizador y la
navegación principal de las 5 pantallas.

### Typecheck

```bash
npm run lint     # tsc --noEmit
```

---

## 10. Build (producción)

```bash
npm run build    # genera dist/ (HTML/CSS/JS estático)
npm run preview  # sirve dist/ localmente para verificar
```

El resultado en `dist/` es un sitio estático listo para cualquier hosting
(S3 + CloudFront, Netlify, GitHub Pages, etc.).

---

## 11. Despliegue en AWS (Terraform opcional)

La carpeta `infra/` crea **S3 privado + CloudFront** (con HTTPS y Origin Access
Control, sin acceso público directo al bucket).

```bash
cd infra
cp terraform.tfvars.example terraform.tfvars   # ajusta región/nombre si quieres
terraform init
terraform apply
```

Luego sube el build y refresca la caché (los comandos exactos salen en el output
`deploy_hint` de Terraform):

```bash
npm run build
aws s3 sync dist s3://<bucket_name> --delete
aws cloudfront create-invalidation --distribution-id <id> --paths "/*"
```

La URL pública está en el output `cloudfront_domain`.

> Requiere credenciales de AWS configuradas y aplicar Terraform crea recursos
> facturables en tu cuenta.

### Alternativa gratuita: GitHub Pages

El repo incluye un workflow (`.github/workflows/deploy-pages.yml`) que en cada
push a `main` corre los tests, compila y publica en GitHub Pages.

Activación (una sola vez, la hace el dueño del repo):

1. En GitHub: **Settings → Pages → Build and deployment → Source: "GitHub Actions"**.
2. Hacer push a `main` (o lanzar el workflow desde la pestaña **Actions**).

La app queda disponible en `https://<usuario>.github.io/<repo>/`
(por ejemplo `https://dicaalba.github.io/dev-challenge-express/`).

> Como Pages sirve la app en un subpath, el workflow compila con
> `VITE_BASE=/<repo>/` para que los assets carguen bien. El build por defecto
> (S3/CloudFront y desarrollo local) sigue usando la raíz `/`.

---

## Evolución futura (preparado, no implementado)

El diseño evita decisiones que dificulten añadir después:

- DynamoDB para las preguntas / API Gateway + Lambda (basta cambiar `challengeRepository`).
- Panel administrativo, estadísticas por evento, preguntas habilitadas/deshabilitadas.
- Dificultad dinámica, leaderboard, modo torneo.
- QR por evento, múltiples comunidades, múltiples idiomas.
- Integración con una API de preguntas generadas con GenAI.

---

## Criterios de aceptación cubiertos

- ✅ Iniciar un challenge en máximo 2 interacciones.
- ✅ Elegir una de las seis categorías.
- ✅ Obtener un reto aleatorio (y "Sorpréndeme").
- ✅ Ver un temporizador.
- ✅ Revelar la respuesta.
- ✅ Iniciar otro reto sin recargar la página.
- ✅ Volver al inicio para un nuevo participante (estado limpio).
- ✅ No requiere autenticación.
- ✅ Responsive para tablet y celular (landscape/portrait).
- ✅ Preguntas desacopladas de la interfaz.
- ✅ Desplegable como sitio estático.
- ✅ Evento y enlaces configurables sin modificar componentes.
