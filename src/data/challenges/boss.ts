import type { Challenge } from '../../types';

/**
 * Banco de retos — Boss Level 🔥
 * Escenarios avanzados de arquitectura, debugging y resiliencia.
 */
export const bossChallenges: Challenge[] = [
  {
    id: 'boss-01',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Diseña una arquitectura serverless para recibir imágenes, generar thumbnails de forma asíncrona y guardar el resultado. ¿Qué usarías?',
    answer: 'S3 + SQS + Lambda + S3',
    acceptedAnswers: [
      'S3 + Lambda',
      'S3 + SQS + Lambda',
      'S3 event -> Lambda',
      'S3 Event Notification + Lambda',
      'S3 + EventBridge + Lambda',
    ],
    explanation:
      'S3 genera el evento y Lambda procesa la imagen. Introducir una cola puede mejorar desacoplamiento y manejo de reintentos.',
    keyConcept: 'Event-driven Serverless',
    timeLimit: 60,
  },
  {
    id: 'boss-02',
    category: 'boss',
    level: 'advanced',
    type: 'debug',
    question:
      'Una Lambda que accede a RDS funciona con poco tráfico, pero empieza a fallar cuando aumenta mucho la concurrencia. ¿Qué problema investigarías primero?',
    answer: 'Agotamiento de conexiones a RDS',
    acceptedAnswers: [
      'connection exhaustion',
      'demasiadas conexiones',
      'connection pooling',
      'RDS Proxy',
      'agotamiento de conexiones',
    ],
    explanation:
      'Muchas invocaciones concurrentes pueden generar demasiadas conexiones. RDS Proxy ayuda a compartir y administrar conexiones.',
    keyConcept: 'Lambda + RDS',
    timeLimit: 60,
  },
  {
    id: 'boss-03',
    category: 'boss',
    level: 'advanced',
    type: 'open',
    question:
      'Un servicio dependiente empieza a fallar repetidamente. ¿Qué patrón evita continuar enviándole requests y provocar una cascada de fallos?',
    answer: 'Circuit Breaker',
    acceptedAnswers: [
      'Circuit Breaker',
      'circuit breaker',
      'cortocircuito',
    ],
    explanation:
      'Circuit Breaker abre temporalmente el circuito después de detectar fallos repetidos y permite que el sistema dependiente se recupere.',
    keyConcept: 'Resilience',
    timeLimit: 60,
  },
  {
    id: 'boss-04',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Un endpoint recibe picos enormes de tráfico y el procesamiento es pesado. No quieres perder trabajo ni saturar el backend. ¿Cómo lo desacoplarías?',
    answer: 'SQS como buffer y consumidores que escalen',
    acceptedAnswers: [
      'SQS + Lambda',
      'SQS + workers',
      'queue',
      'buffer con cola',
      'queue-based load leveling',
    ],
    explanation:
      'Una cola absorbe el pico de tráfico y permite que los consumidores procesen a una velocidad controlada.',
    keyConcept: 'Queue-based Load Leveling',
    timeLimit: 60,
  },
  {
    id: 'boss-05',
    category: 'boss',
    level: 'advanced',
    type: 'debug',
    question:
      'Desplegaste una nueva versión de tu frontend en S3, pero algunos usuarios siguen recibiendo archivos antiguos desde CloudFront. ¿Qué revisarías?',
    answer: 'La caché de CloudFront',
    acceptedAnswers: [
      'cache',
      'CloudFront cache',
      'invalidación',
      'cache invalidation',
      'TTL',
      'versionado de assets',
    ],
    explanation:
      'Los objetos pueden seguir cacheados. Puedes invalidarlos o utilizar nombres/versiones únicas de assets.',
    keyConcept: 'CDN Caching',
    timeLimit: 60,
  },
  {
    id: 'boss-06',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Un consumidor procesa el mismo mensaje dos veces debido a reintentos. ¿Cómo diseñarías la operación para evitar efectos duplicados?',
    answer: 'Implementar idempotencia con un identificador único',
    acceptedAnswers: [
      'idempotency key',
      'clave de idempotencia',
      'idempotencia',
      'deduplicación',
    ],
    explanation:
      'Las operaciones deben reconocer reintentos de una misma solicitud y evitar repetir efectos secundarios.',
    keyConcept: 'Idempotency',
    timeLimit: 60,
  },
  {
    id: 'boss-07',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Tienes varios servicios que necesitan reaccionar independientemente a eventos de negocio. El productor no debería conocer a los consumidores. ¿Qué arquitectura propondrías?',
    answer: 'Event-driven architecture con EventBridge',
    acceptedAnswers: [
      'EventBridge',
      'Amazon EventBridge',
      'event-driven architecture',
      'event bus',
      'SNS',
    ],
    explanation:
      'Un event bus permite desacoplar productores y consumidores, evolucionando cada componente de forma independiente.',
    keyConcept: 'Event-driven Architecture',
    timeLimit: 60,
  },
  {
    id: 'boss-08',
    category: 'boss',
    level: 'advanced',
    type: 'debug',
    question:
      'Una request atraviesa varios microservicios y tarda 5 segundos, pero los logs individuales no muestran claramente dónde está la latencia. ¿Qué implementarías?',
    answer: 'Distributed tracing',
    acceptedAnswers: [
      'distributed tracing',
      'tracing',
      'OpenTelemetry',
      'AWS X-Ray',
      'X-Ray',
    ],
    explanation:
      'Distributed tracing permite seguir una request de extremo a extremo y localizar la latencia entre servicios.',
    keyConcept: 'Observability',
    timeLimit: 60,
  },
  {
    id: 'boss-09',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Necesitas desplegar una nueva versión de una API reduciendo el riesgo y pudiendo regresar rápidamente a la versión anterior. ¿Qué estrategia usarías?',
    answer: 'Blue/Green o Canary Deployment',
    acceptedAnswers: [
      'blue green',
      'blue/green',
      'canary',
      'canary deployment',
      'canary release',
    ],
    explanation:
      'Blue/Green facilita rollback rápido; Canary reduce riesgo exponiendo gradualmente la nueva versión.',
    keyConcept: 'Deployment Strategy',
    timeLimit: 60,
  },
  {
    id: 'boss-10',
    category: 'boss',
    level: 'advanced',
    type: 'debug',
    question:
      'Tu aplicación RAG responde con información antigua aunque los documentos fuente ya fueron actualizados. ¿Qué componentes revisarías?',
    answer: 'Ingesta, chunking, embeddings, indexación y retrieval',
    acceptedAnswers: [
      'RAG',
      'reindexar',
      'embeddings',
      'vector store',
      'retrieval',
      'indexación',
      'pipeline de RAG',
    ],
    explanation:
      'El problema puede estar entre la actualización del documento y su incorporación al índice o en cómo se recupera el contexto.',
    keyConcept: 'RAG Troubleshooting',
    timeLimit: 60,
  },
  {
    id: 'boss-11',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Una aplicación en EKS necesita acceder a S3. No quieres Access Keys dentro de Secrets o variables de entorno. ¿Qué enfoque usarías?',
    answer: 'IAM Role asociado al workload mediante EKS Pod Identity o mecanismo equivalente',
    acceptedAnswers: [
      'EKS Pod Identity',
      'Pod Identity',
      'IRSA',
      'IAM Role',
      'IAM role for service account',
    ],
    explanation:
      'La aplicación debería recibir credenciales temporales asociadas a su identidad de workload en lugar de credenciales estáticas.',
    keyConcept: 'Workload Identity',
    timeLimit: 60,
  },
  {
    id: 'boss-12',
    category: 'boss',
    level: 'advanced',
    type: 'architecture',
    question:
      'Un sistema procesa eventos con entrega at-least-once. ¿Qué propiedad debería tener el consumidor para soportar duplicados?',
    answer: 'Ser idempotente',
    acceptedAnswers: [
      'idempotencia',
      'idempotente',
      'idempotent consumer',
      'deduplicación',
    ],
    explanation:
      'En sistemas at-least-once pueden existir duplicados, por lo que los consumidores deben manejarlos sin repetir efectos.',
    keyConcept: 'Distributed Systems',
    timeLimit: 60,
  },
];