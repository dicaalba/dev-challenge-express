import type { Challenge } from '../../types';

/** Banco de retos — DevOps ⚙️ */
export const devopsChallenges: Challenge[] = [
  {
    id: 'devops-01',
    category: 'devops',
    level: 'easy',
    type: 'multiple-choice',
    question: '¿Qué significa CI en CI/CD?',
    options: [
      'Continuous Integration',
      'Cloud Infrastructure',
      'Container Init',
      'Code Inspection',
    ],
    answer: 'Continuous Integration',
    explanation:
      'Continuous Integration integra cambios frecuentemente y ejecuta automáticamente build y tests.',
    keyConcept: 'CI/CD',
    timeLimit: 30,
  },
  {
    id: 'devops-02',
    category: 'devops',
    level: 'easy',
    type: 'true-false',
    question:
      'Los containers y las máquinas virtuales virtualizan exactamente lo mismo.',
    options: ['Verdadero', 'Falso'],
    answer: 'Falso',
    explanation:
      'Los containers comparten el kernel del host, mientras una VM virtualiza hardware y ejecuta su propio sistema operativo.',
    keyConcept: 'Containers vs VMs',
    timeLimit: 30,
  },
  {
    id: 'devops-03',
    category: 'devops',
    level: 'medium',
    type: 'open',
    question:
      '¿Qué herramienta declarativa y multi-cloud usarías para definir infraestructura como código?',
    answer: 'Terraform',
    acceptedAnswers: ['Terraform', 'HashiCorp Terraform', 'OpenTofu'],
    explanation:
      'Terraform y OpenTofu permiten describir infraestructura declarativamente y versionarla como código.',
    keyConcept: 'Infrastructure as Code',
    timeLimit: 30,
  },
  {
    id: 'devops-04',
    category: 'devops',
    level: 'medium',
    type: 'multiple-choice',
    question:
      'Antes de ejecutar cambios con Terraform, ¿qué comando permite revisar qué recursos se modificarán?',
    options: [
      'terraform plan',
      'terraform destroy',
      'terraform fmt',
      'terraform output',
    ],
    answer: 'terraform plan',
    explanation:
      'terraform plan calcula y muestra los cambios previstos antes de ejecutarlos.',
    keyConcept: 'IaC workflow',
    timeLimit: 30,
  },
  {
    id: 'devops-05',
    category: 'devops',
    level: 'medium',
    type: 'debug',
    question:
      'Un pod de Kubernetes está en CrashLoopBackOff. ¿Cuál sería uno de tus primeros pasos de diagnóstico?',
    answer: 'Revisar los logs del contenedor',
    acceptedAnswers: [
      'kubectl logs',
      'ver logs',
      'revisar logs',
      'kubectl describe pod',
    ],
    explanation:
      'Los logs y eventos del pod ayudan a identificar errores de aplicación, configuración o startup.',
    keyConcept: 'Troubleshooting Kubernetes',
    timeLimit: 30,
  },
  {
    id: 'devops-06',
    category: 'devops',
    level: 'medium',
    type: 'true-false',
    question:
      'Blue/Green Deployment permite volver rápidamente a una versión anterior cambiando el tráfico.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'Blue/Green mantiene dos versiones de la aplicación y permite redirigir el tráfico entre ellas.',
    keyConcept: 'Deployment strategies',
    timeLimit: 30,
  },
  {
    id: 'devops-07',
    category: 'devops',
    level: 'medium',
    type: 'multiple-choice',
    question:
      '¿Qué servicio de AWS orquesta las etapas de un pipeline de CI/CD?',
    options: [
      'AWS CodePipeline',
      'Amazon S3',
      'Amazon Route 53',
      'AWS Secrets Manager',
    ],
    answer: 'AWS CodePipeline',
    explanation:
      'CodePipeline orquesta las etapas de source, build, test y deployment y puede integrarse con otros servicios.',
    keyConcept: 'CI/CD orchestration',
    timeLimit: 30,
  },
  {
    id: 'devops-08',
    category: 'devops',
    level: 'medium',
    type: 'architecture',
    question:
      'Varias personas ejecutan terraform apply manualmente contra producción desde sus laptops. ¿Qué mejorarías?',
    answer: 'Centralizar el apply en un pipeline con revisión previa',
    acceptedAnswers: [
      'pipeline',
      'CI/CD',
      'pipeline con terraform plan y apply',
      'remote state + pipeline',
      'automatizar con pipeline',
    ],
    explanation:
      'Ejecutar IaC mediante pipelines mejora trazabilidad, revisión, control de permisos y reproducibilidad.',
    keyConcept: 'IaC governance',
    timeLimit: 30,
  },
  {
    id: 'devops-09',
    category: 'devops',
    level: 'medium',
    type: 'architecture',
    question:
      'Quieres desplegar una nueva versión solo a un pequeño porcentaje del tráfico antes de liberarla a todos. ¿Qué estrategia usarías?',
    answer: 'Canary deployment',
    acceptedAnswers: [
      'canary',
      'canary deployment',
      'canary release',
      'despliegue canario',
    ],
    explanation:
      'Canary permite exponer gradualmente una nueva versión y validar métricas antes de aumentar el tráfico.',
    keyConcept: 'Progressive delivery',
    timeLimit: 30,
  },
  {
    id: 'devops-10',
    category: 'devops',
    level: 'medium',
    type: 'open',
    question:
      '¿Qué tres señales básicas revisarías al investigar por qué una aplicación está fallando o lenta?',
    answer: 'Logs, métricas y traces',
    acceptedAnswers: [
      'logs metrics traces',
      'logs métricas trazas',
      'logs, métricas y traces',
      'logs, metrics and traces',
    ],
    explanation:
      'Logs, métricas y tracing proporcionan distintas perspectivas para entender el comportamiento de un sistema.',
    keyConcept: 'Observability',
    timeLimit: 30,
  },
  {
    id: 'devops-11',
    category: 'devops',
    level: 'medium',
    type: 'debug',
    question:
      'Un deployment de Kubernetes está healthy, pero los usuarios reciben errores porque el pod todavía no está listo para tráfico. ¿Qué deberías revisar?',
    answer: 'Readiness Probe',
    acceptedAnswers: [
      'readiness probe',
      'readiness',
      'health check de readiness',
    ],
    explanation:
      'La readiness probe indica cuándo un pod está preparado para recibir tráfico.',
    keyConcept: 'Kubernetes probes',
    timeLimit: 30,
  },
  {
    id: 'devops-12',
    category: 'devops',
    level: 'medium',
    type: 'true-false',
    question:
      'Un pipeline de CI/CD debería poder ejecutar controles automáticos antes de desplegar a producción.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'Tests, análisis de seguridad, policy checks y aprobaciones pueden actuar como quality gates antes del deployment.',
    keyConcept: 'Quality gates',
    timeLimit: 30,
  },
];