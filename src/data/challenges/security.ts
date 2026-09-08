import type { Challenge } from '../../types';

/** Banco de retos — Security 🔐 */
export const securityChallenges: Challenge[] = [
  {
    id: 'security-01',
    category: 'security',
    level: 'easy',
    type: 'multiple-choice',
    question:
      '¿Qué principio recomienda otorgar únicamente los permisos estrictamente necesarios?',
    options: [
      'Menor privilegio',
      'Defensa en profundidad',
      'Fail-safe',
      'Alta disponibilidad',
    ],
    answer: 'Menor privilegio',
    explanation:
      'Least Privilege reduce la superficie de ataque limitando permisos a lo estrictamente necesario.',
    keyConcept: 'Least Privilege',
    timeLimit: 30,
  },
  {
    id: 'security-02',
    category: 'security',
    level: 'easy',
    type: 'true-false',
    question:
      'Es seguro almacenar contraseñas en texto plano si la base de datos solo es accesible desde una VPC privada.',
    options: ['Verdadero', 'Falso'],
    answer: 'Falso',
    explanation:
      'Las contraseñas deben almacenarse usando algoritmos de hashing adecuados y salt.',
    keyConcept: 'Password Security',
    timeLimit: 30,
  },
  {
    id: 'security-03',
    category: 'security',
    level: 'medium',
    type: 'debug',
    question:
      'Una aplicación construye consultas SQL concatenando directamente req.body.email. ¿Cuál es el riesgo principal?',
    answer: 'SQL Injection',
    acceptedAnswers: [
      'SQL Injection',
      'inyección SQL',
      'SQL injection vulnerability',
    ],
    explanation:
      'La entrada debe tratarse como datos mediante consultas parametrizadas, no concatenarse como parte del SQL.',
    keyConcept: 'Injection',
    timeLimit: 30,
  },
  {
    id: 'security-04',
    category: 'security',
    level: 'medium',
    type: 'open',
    question:
      'Necesitas almacenar credenciales de base de datos y rotarlas automáticamente. ¿Qué servicio de AWS usarías?',
    answer: 'AWS Secrets Manager',
    acceptedAnswers: ['Secrets Manager', 'AWS Secrets Manager'],
    explanation:
      'Secrets Manager permite almacenar secretos cifrados e implementar rotación automática.',
    keyConcept: 'Secrets Management',
    timeLimit: 30,
  },
  {
    id: 'security-05',
    category: 'security',
    level: 'medium',
    type: 'multiple-choice',
    question:
      '¿Qué ataque permite ejecutar scripts maliciosos en el navegador de otros usuarios?',
    options: [
      'XSS',
      'SQL Injection',
      'DDoS',
      'Credential Stuffing',
    ],
    answer: 'XSS',
    explanation:
      'Cross-Site Scripting permite inyectar contenido ejecutable en páginas consumidas por otros usuarios.',
    keyConcept: 'XSS',
    timeLimit: 30,
  },
  {
    id: 'security-06',
    category: 'security',
    level: 'medium',
    type: 'true-false',
    question:
      'HTTPS protege los datos durante el tránsito entre cliente y servidor.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'HTTPS utiliza TLS para proporcionar cifrado e integridad a los datos en tránsito.',
    keyConcept: 'Encryption in Transit',
    timeLimit: 30,
  },
  {
    id: 'security-07',
    category: 'security',
    level: 'medium',
    type: 'architecture',
    question:
      'Una aplicación en AWS necesita acceder a S3. ¿Es mejor guardar Access Keys dentro del código o utilizar un rol IAM?',
    answer: 'Utilizar un rol IAM',
    acceptedAnswers: [
      'IAM Role',
      'rol IAM',
      'role',
      'usar un rol',
    ],
    explanation:
      'Los roles permiten utilizar credenciales temporales y evitan distribuir credenciales estáticas en aplicaciones.',
    keyConcept: 'Temporary Credentials',
    timeLimit: 30,
  },
  {
    id: 'security-08',
    category: 'security',
    level: 'medium',
    type: 'debug',
    question:
      'Detectas que un bucket S3 que debería ser privado quedó accesible públicamente. ¿Qué harías primero?',
    answer: 'Bloquear inmediatamente el acceso público',
    acceptedAnswers: [
      'Block Public Access',
      'S3 Block Public Access',
      'bloquear acceso público',
      'quitar acceso público',
    ],
    explanation:
      'Primero se contiene la exposición y luego se investiga la configuración, logs y posible acceso no autorizado.',
    keyConcept: 'Incident Containment',
    timeLimit: 30,
  },
  {
    id: 'security-09',
    category: 'security',
    level: 'easy',
    type: 'true-false',
    question:
      'Es recomendable utilizar las credenciales root de AWS para las tareas administrativas del día a día.',
    options: ['Verdadero', 'Falso'],
    answer: 'Falso',
    explanation:
      'Las credenciales root deben protegerse y reservarse únicamente para tareas que realmente las requieran.',
    keyConcept: 'Root Account Protection',
    timeLimit: 30,
  },
  {
    id: 'security-10',
    category: 'security',
    level: 'medium',
    type: 'multiple-choice',
    question:
      '¿Qué control agrega un segundo factor de verificación al proceso de autenticación?',
    options: ['MFA', 'CORS', 'DNSSEC', 'Caching'],
    answer: 'MFA',
    explanation:
      'Multi-Factor Authentication requiere más de una evidencia para verificar la identidad.',
    keyConcept: 'MFA',
    timeLimit: 30,
  },
  {
    id: 'security-11',
    category: 'security',
    level: 'medium',
    type: 'debug',
    question:
      'Un developer agregó una API key real dentro de un repositorio Git. Además de eliminarla del código, ¿qué deberías hacer?',
    answer: 'Revocar o rotar inmediatamente la credencial',
    acceptedAnswers: [
      'rotar credencial',
      'revocar credencial',
      'rotar API key',
      'revocar API key',
      'rotate the secret',
    ],
    explanation:
      'Una credencial publicada debe considerarse comprometida aunque luego se elimine del repositorio.',
    keyConcept: 'Secret Leakage',
    timeLimit: 30,
  },
  {
    id: 'security-12',
    category: 'security',
    level: 'medium',
    type: 'architecture',
    question:
      'Tu frontend necesita llamar una API. ¿Dónde deberían aplicarse las autorizaciones sensibles: solo en el frontend o también en el backend?',
    answer: 'En el backend',
    acceptedAnswers: [
      'backend',
      'servidor',
      'API',
      'backend y frontend',
    ],
    explanation:
      'El frontend no puede considerarse una frontera de seguridad. Las autorizaciones deben validarse en el backend.',
    keyConcept: 'Authorization',
    timeLimit: 30,
  },
];