import type { Challenge } from '../../types';

/**
 * Banco de retos — Boss Level 🔥
 * Retos avanzados y combinados. Todos con timeLimit de 60 segundos.
 */
export const bossChallenges: Challenge[] = [
  {
    id: 'boss-01',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Diseña el backend de una app que sube imágenes y las procesa (thumbnails) de forma asíncrona y serverless en AWS. ¿Qué combinación usarías?',
    answer: 'S3 + evento a Lambda (o vía SQS) para procesar y guardar el resultado en S3',
    acceptedAnswers: [
      'S3 + Lambda',
      'S3 event -> Lambda',
      'S3 + SQS + Lambda',
      'S3 event notification a Lambda',
    ],
    explanation:
      'Al subir a S3 se dispara un evento hacia Lambda (directo o vía SQS para desacoplar y reintentar); Lambda genera el thumbnail y lo guarda en S3. Todo serverless y escalable.',
    keyConcept: 'Arquitectura event-driven serverless',
    timeLimit: 60,
  },
  {
    id: 'boss-02',
    category: 'boss',
    level: 'advanced',
    type: 'debug',
    question:
      'Una Lambda detrás de API Gateway funciona en pruebas pero en producción da timeouts intermitentes al llamar a RDS. ¿Causa probable?',
    answer: 'Agotamiento de conexiones a la base de datos (falta de pooling / RDS Proxy)',
    acceptedAnswers: [
      'RDS Proxy',
      'connection pooling',
      'demasiadas conexiones',
      'cold start + conexiones',
    ],
    explanation:
      'Cada invocación abre conexiones nuevas; con alta concurrencia se agota el límite de conexiones de RDS. RDS Proxy o pooling reutilizan conexiones y evitan el timeout.',
    keyConcept: 'Lambda + RDS a escala',
    timeLimit: 60,
  },
  {
    id: 'boss-03',
    category: 'boss',
    level: 'advanced',
    type: 'open',
    question:
      '¿Qué patrón evita cascadas de fallos cuando un servicio dependiente está caído, cortando temporalmente las llamadas?',
    answer: 'Circuit Breaker',
    acceptedAnswers: ['circuit breaker', 'cortocircuito'],
    explanation:
      'El Circuit Breaker abre el circuito tras detectar fallos repetidos, evitando llamadas al servicio caído y dando tiempo a recuperarse.',
    keyConcept: 'Resiliencia',
    timeLimit: 60,
  },
  {
    id: 'boss-04',
    category: 'boss',
    level: 'advanced',
    type: 'multiple-choice',
    question:
      'Necesitas consistencia fuerte y transacciones ACID en múltiples filas. ¿Qué opción encaja mejor?',
    options: [
      'Base de datos relacional (RDS/Aurora)',
      'DynamoDB sin diseño previo',
      'S3',
      'ElastiCache',
    ],
    answer: 'Base de datos relacional (RDS/Aurora)',
    explanation:
      'Las bases relacionales ofrecen transacciones ACID y consistencia fuerte de forma natural. DynamoDB soporta transacciones pero requiere un diseño de acceso muy específico.',
    keyConcept: 'ACID vs NoSQL',
    timeLimit: 60,
  },
  {
    id: 'boss-05',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Un endpoint recibe picos enormes de tráfico impredecibles y procesa cada request de forma pesada. ¿Cómo lo proteges sin perder mensajes?',
    answer: 'Encolar con SQS y procesar con workers/Lambda que escalan según la cola',
    acceptedAnswers: ['SQS + workers', 'buffer con cola', 'SQS + Lambda', 'queue-based load leveling'],
    explanation:
      'El patrón "queue-based load leveling" amortigua los picos: la cola absorbe el tráfico y los consumidores procesan a su ritmo, evitando saturar el backend.',
    keyConcept: 'Load leveling',
    timeLimit: 60,
  },
  {
    id: 'boss-06',
    category: 'boss',
    level: 'advanced',
    type: 'debug',
    question:
      'Tras un despliegue, el frontend en CloudFront sigue mostrando la versión vieja pese a subir nuevos archivos a S3. ¿Por qué?',
    answer: 'La caché de CloudFront no fue invalidada',
    acceptedAnswers: ['invalidación de caché', 'cache invalidation', 'invalidar CloudFront', 'TTL de caché'],
    explanation:
      'CloudFront cachea los objetos según su TTL. Tras un deploy hay que crear una invalidación (o usar nombres de archivo versionados) para servir la versión nueva.',
    keyConcept: 'Invalidación de CDN',
    timeLimit: 60,
  },
  {
    id: 'boss-07',
    category: 'boss',
    level: 'advanced',
    type: 'open',
    question:
      '¿Qué técnica de despliegue libera una funcionalidad a un pequeño porcentaje de usuarios antes que al resto?',
    answer: 'Canary release',
    acceptedAnswers: ['canary', 'despliegue canario', 'canary deployment'],
    explanation:
      'El canary release expone la nueva versión a un porcentaje reducido de tráfico; si las métricas son buenas, se aumenta gradualmente.',
    keyConcept: 'Canary release',
    timeLimit: 60,
  },
  {
    id: 'boss-08',
    category: 'boss',
    level: 'advanced',
    type: 'multiple-choice',
    question:
      'En un sistema distribuido, el teorema CAP dice que ante una partición de red debes sacrificar:',
    options: [
      'Consistencia o Disponibilidad',
      'Latencia o Costo',
      'Seguridad o Escalabilidad',
      'Nada, se puede tener todo',
    ],
    answer: 'Consistencia o Disponibilidad',
    explanation:
      'El teorema CAP establece que ante una partición (P) hay que elegir entre Consistencia (C) y Disponibilidad (A); no se pueden garantizar ambas simultáneamente.',
    keyConcept: 'Teorema CAP',
    timeLimit: 60,
  },
  {
    id: 'boss-09',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Necesitas ejecutar tareas idempotentes que pueden reintentarse sin efectos duplicados. ¿Qué garantizas en su diseño?',
    answer: 'Idempotencia mediante una clave/identificador único de operación',
    acceptedAnswers: ['idempotency key', 'clave de idempotencia', 'operación idempotente'],
    explanation:
      'Usar una idempotency key permite detectar reintentos y aplicar la operación una sola vez, evitando duplicados en entregas "at-least-once".',
    keyConcept: 'Idempotencia',
    timeLimit: 60,
  },
  {
    id: 'boss-10',
    category: 'boss',
    level: 'advanced',
    type: 'debug',
    question:
      'Un LLM en producción responde con datos desactualizados pese a que la info existe en tus documentos. ¿Qué revisarías primero?',
    answer: 'El pipeline de RAG: indexación/recuperación de los documentos',
    acceptedAnswers: ['RAG', 'indexación de embeddings', 'recuperación de contexto', 'reindexar documentos'],
    explanation:
      'Si el contexto correcto no llega al modelo, revisa el pipeline RAG: que los documentos estén indexados como embeddings y que la recuperación traiga los fragmentos relevantes.',
    keyConcept: 'Depuración de RAG',
    timeLimit: 60,
  },
];
