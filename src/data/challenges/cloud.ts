import type { Challenge } from '../../types';

/** Banco de retos — Cloud ☁️ */
export const cloudChallenges: Challenge[] = [
  {
    id: 'cloud-01',
    category: 'cloud',
    level: 'easy',
    type: 'multiple-choice',
    question:
      'Necesitas almacenar imágenes y archivos estáticos de una aplicación. ¿Qué servicio usarías?',
    options: ['Amazon EC2', 'Amazon S3', 'Amazon RDS', 'AWS Lambda'],
    answer: 'Amazon S3',
    explanation:
      'Amazon S3 es almacenamiento de objetos y es ideal para archivos estáticos como imágenes, documentos y assets.',
    keyConcept: 'Object Storage',
    timeLimit: 30,
  },
  {
    id: 'cloud-02',
    category: 'cloud',
    level: 'easy',
    type: 'true-false',
    question:
      'Una región de AWS está compuesta por múltiples zonas de disponibilidad.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'Las regiones contienen múltiples Availability Zones aisladas entre sí para mejorar disponibilidad y resiliencia.',
    keyConcept: 'Regiones y AZ',
    timeLimit: 30,
  },
  {
    id: 'cloud-03',
    category: 'cloud',
    level: 'easy',
    type: 'multiple-choice',
    question:
      'Necesitas ejecutar código cuando se sube un archivo a S3 sin administrar servidores. ¿Qué usarías?',
    options: ['AWS Lambda', 'Amazon EC2', 'Amazon EBS', 'Amazon Route 53'],
    answer: 'AWS Lambda',
    explanation:
      'S3 puede generar eventos que invoquen funciones Lambda para procesamiento event-driven.',
    keyConcept: 'Serverless',
    timeLimit: 30,
  },
  {
    id: 'cloud-04',
    category: 'cloud',
    level: 'medium',
    type: 'architecture',
    question:
      'Tu aplicación necesita URLs temporales para que el navegador suba archivos directamente a S3 sin pasar el archivo por tu backend. ¿Qué usarías?',
    answer: 'S3 Presigned URLs',
    acceptedAnswers: [
      'presigned URL',
      'presigned URLs',
      'S3 presigned URL',
      'URL prefirmada',
    ],
    explanation:
      'Una Presigned URL permite otorgar acceso temporal a una operación específica de S3 sin exponer credenciales AWS.',
    keyConcept: 'Presigned URLs',
    timeLimit: 30,
  },
  {
    id: 'cloud-05',
    category: 'cloud',
    level: 'medium',
    type: 'multiple-choice',
    question:
      'Necesitas una base NoSQL administrada que escale automáticamente. ¿Qué servicio encaja mejor?',
    options: [
      'Amazon DynamoDB',
      'Amazon RDS',
      'Amazon EFS',
      'Amazon Redshift',
    ],
    answer: 'Amazon DynamoDB',
    explanation:
      'DynamoDB es una base NoSQL administrada diseñada para baja latencia y escalabilidad.',
    keyConcept: 'NoSQL',
    timeLimit: 30,
  },
  {
    id: 'cloud-06',
    category: 'cloud',
    level: 'medium',
    type: 'architecture',
    question:
      'Una API recibe picos de trabajo y quieres desacoplar la recepción del procesamiento para no perder solicitudes. ¿Qué servicio usarías?',
    answer: 'Amazon SQS',
    acceptedAnswers: ['SQS', 'Amazon SQS', 'Simple Queue Service'],
    explanation:
      'SQS actúa como buffer entre productores y consumidores, desacoplando componentes y absorbiendo picos.',
    keyConcept: 'Asynchronous messaging',
    timeLimit: 30,
  },
  {
    id: 'cloud-07',
    category: 'cloud',
    level: 'medium',
    type: 'architecture',
    question:
      'Un mismo evento debe ser consumido por varios sistemas independientes. ¿Qué enfoque usarías?',
    answer: 'Pub/Sub con SNS o EventBridge',
    acceptedAnswers: [
      'SNS',
      'Amazon SNS',
      'EventBridge',
      'Amazon EventBridge',
      'pub/sub',
    ],
    explanation:
      'SNS y EventBridge permiten distribuir eventos a múltiples consumidores desacoplados.',
    keyConcept: 'Event-driven architecture',
    timeLimit: 30,
  },
  {
    id: 'cloud-08',
    category: 'cloud',
    level: 'medium',
    type: 'debug',
    question:
      'Una Lambda consume mensajes de SQS. Algunos mensajes fallan repetidamente. ¿Qué agregarías para aislarlos?',
    answer: 'Una Dead-Letter Queue (DLQ)',
    acceptedAnswers: [
      'DLQ',
      'Dead Letter Queue',
      'Dead-Letter Queue',
      'SQS DLQ',
    ],
    explanation:
      'Una DLQ recibe mensajes que exceden el número máximo de intentos, evitando reintentos indefinidos.',
    keyConcept: 'Failure handling',
    timeLimit: 30,
  },
  {
    id: 'cloud-09',
    category: 'cloud',
    level: 'medium',
    type: 'multiple-choice',
    question:
      'Quieres distribuir contenido estático globalmente con baja latencia. ¿Qué servicio usarías?',
    options: [
      'Amazon CloudFront',
      'Amazon CloudWatch',
      'Amazon SQS',
      'Amazon EBS',
    ],
    answer: 'Amazon CloudFront',
    explanation:
      'CloudFront distribuye y cachea contenido desde edge locations cercanas a los usuarios.',
    keyConcept: 'CDN',
    timeLimit: 30,
  },
  {
    id: 'cloud-10',
    category: 'cloud',
    level: 'medium',
    type: 'architecture',
    question:
      'Tu API recibe demasiadas solicitudes desde un mismo cliente. ¿Qué concepto aplicarías para protegerla?',
    answer: 'Rate limiting / throttling',
    acceptedAnswers: [
      'rate limiting',
      'throttling',
      'rate limit',
      'limitar requests',
    ],
    explanation:
      'Rate limiting y throttling permiten controlar cuántas solicitudes puede realizar un consumidor en un periodo.',
    keyConcept: 'API protection',
    timeLimit: 30,
  },
  {
    id: 'cloud-11',
    category: 'cloud',
    level: 'easy',
    type: 'true-false',
    question:
      'En el modelo de responsabilidad compartida, AWS es responsable de la seguridad DE la nube y el cliente de la seguridad EN la nube.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'AWS protege la infraestructura de la nube y el cliente configura y protege sus workloads, identidades y datos.',
    keyConcept: 'Shared Responsibility Model',
    timeLimit: 30,
  },
  {
    id: 'cloud-12',
    category: 'cloud',
    level: 'medium',
    type: 'open',
    question:
      '¿Qué servicio de AWS usarías para resolver nombres DNS y configurar routing basado en salud o latencia?',
    answer: 'Amazon Route 53',
    acceptedAnswers: ['Route 53', 'Amazon Route 53'],
    explanation:
      'Route 53 proporciona DNS administrado, health checks y distintas políticas de routing.',
    keyConcept: 'DNS',
    timeLimit: 30,
  },
];