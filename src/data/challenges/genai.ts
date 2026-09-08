import type { Challenge } from '../../types';

/** Banco de retos — GenAI 🤖 */
export const genaiChallenges: Challenge[] = [
  {
    id: 'genai-01',
    category: 'genai',
    level: 'easy',
    type: 'multiple-choice',
    question: '¿Qué significa LLM?',
    options: [
      'Large Language Model',
      'Long Learning Machine',
      'Linear Logic Model',
      'Low Latency Module',
    ],
    answer: 'Large Language Model',
    explanation:
      'Un Large Language Model aprende patrones del lenguaje a partir de grandes cantidades de datos.',
    keyConcept: 'LLM',
    timeLimit: 30,
  },
  {
    id: 'genai-02',
    category: 'genai',
    level: 'medium',
    type: 'open',
    question:
      '¿Qué servicio de AWS permite acceder a distintos Foundation Models mediante APIs administradas?',
    answer: 'Amazon Bedrock',
    acceptedAnswers: ['Amazon Bedrock', 'Bedrock'],
    explanation:
      'Amazon Bedrock proporciona acceso administrado a Foundation Models y servicios para construir aplicaciones de GenAI.',
    keyConcept: 'Foundation Models',
    timeLimit: 30,
  },
  {
    id: 'genai-03',
    category: 'genai',
    level: 'medium',
    type: 'multiple-choice',
    question:
      'Quieres que un chatbot responda usando documentos privados que cambian frecuentemente. ¿Qué enfoque es más apropiado?',
    options: [
      'RAG',
      'Entrenar un modelo desde cero',
      'Aumentar temperature',
      'Guardar los documentos en el prompt para siempre',
    ],
    answer: 'RAG',
    explanation:
      'RAG recupera información relevante en tiempo de consulta y la proporciona al modelo como contexto.',
    keyConcept: 'RAG',
    timeLimit: 30,
  },
  {
    id: 'genai-04',
    category: 'genai',
    level: 'easy',
    type: 'true-false',
    question:
      'Un LLM puede generar una respuesta convincente aunque la información sea incorrecta.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'Este comportamiento suele denominarse hallucination y requiere controles y grounding cuando la precisión es importante.',
    keyConcept: 'Hallucinations',
    timeLimit: 30,
  },
  {
    id: 'genai-05',
    category: 'genai',
    level: 'medium',
    type: 'open',
    question:
      '¿Cómo se llama la representación vectorial que captura características semánticas de texto u otros datos?',
    answer: 'Embedding',
    acceptedAnswers: [
      'embedding',
      'embeddings',
      'vector embedding',
      'vector embeddings',
    ],
    explanation:
      'Los embeddings permiten comparar contenido según similitud y son fundamentales en búsquedas semánticas y RAG.',
    keyConcept: 'Embeddings',
    timeLimit: 30,
  },
  {
    id: 'genai-06',
    category: 'genai',
    level: 'medium',
    type: 'multiple-choice',
    question:
      '¿Qué parámetro se usa habitualmente para controlar cuán determinista o diversa puede ser la salida de un modelo?',
    options: ['Temperature', 'Batch size', 'Epoch', 'Dropout'],
    answer: 'Temperature',
    explanation:
      'La temperature modifica la distribución utilizada al seleccionar tokens y puede influir en la variabilidad de las respuestas.',
    keyConcept: 'Inference Parameters',
    timeLimit: 30,
  },
  {
    id: 'genai-07',
    category: 'genai',
    level: 'medium',
    type: 'architecture',
    question:
      'Tu aplicación necesita buscar fragmentos semánticamente similares dentro de miles de documentos. ¿Qué componente necesitas?',
    answer: 'Embeddings y búsqueda vectorial',
    acceptedAnswers: [
      'vector database',
      'base vectorial',
      'vector search',
      'embeddings',
      'embeddings + vector database',
    ],
    explanation:
      'Los documentos se convierten en embeddings y se comparan mediante similitud vectorial.',
    keyConcept: 'Vector Search',
    timeLimit: 30,
  },
  {
    id: 'genai-08',
    category: 'genai',
    level: 'medium',
    type: 'debug',
    question:
      'Tu chatbot con RAG responde con información antigua aunque los documentos ya fueron actualizados. ¿Qué revisarías primero?',
    answer: 'La indexación y recuperación del conocimiento',
    acceptedAnswers: [
      'RAG',
      'indexación',
      'reindexar',
      'embeddings',
      'retrieval',
      'vector store',
    ],
    explanation:
      'Si los documentos cambiaron, hay que comprobar que el índice/vector store esté actualizado y que el retrieval recupere los chunks correctos.',
    keyConcept: 'RAG Troubleshooting',
    timeLimit: 30,
  },
  {
    id: 'genai-09',
    category: 'genai',
    level: 'medium',
    type: 'true-false',
    question:
      'Fine-tuning ajusta parámetros de un modelo preentrenado usando un conjunto de datos específico.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'Fine-tuning adapta un modelo preentrenado a ciertos patrones, tareas o dominios mediante entrenamiento adicional.',
    keyConcept: 'Fine-tuning',
    timeLimit: 30,
  },
  {
    id: 'genai-10',
    category: 'genai',
    level: 'medium',
    type: 'multiple-choice',
    question:
      '¿Qué riesgo debes considerar antes de enviar información confidencial a un sistema de GenAI?',
    options: [
      'Exposición de información sensible',
      'Que la GPU sea demasiado rápida',
      'Que JSON deje de funcionar',
      'Ninguno',
    ],
    answer: 'Exposición de información sensible',
    explanation:
      'Antes de integrar GenAI hay que evaluar tratamiento de datos, controles de acceso y políticas del servicio utilizado.',
    keyConcept: 'GenAI Security',
    timeLimit: 30,
  },
  {
    id: 'genai-11',
    category: 'genai',
    level: 'medium',
    type: 'architecture',
    question:
      'Quieres que un modelo pueda consultar una API externa cuando necesite información actualizada. ¿Qué capacidad necesitas?',
    answer: 'Tool use / function calling',
    acceptedAnswers: [
      'tool use',
      'function calling',
      'tools',
      'llamar herramientas',
      'agente',
    ],
    explanation:
      'Tool use permite que el modelo solicite la ejecución de herramientas externas para obtener datos o realizar acciones.',
    keyConcept: 'Tool Use',
    timeLimit: 30,
  },
  {
    id: 'genai-12',
    category: 'genai',
    level: 'medium',
    type: 'architecture',
    question:
      'Un usuario intenta incluir instrucciones dentro de un documento para que el modelo ignore las reglas de tu aplicación. ¿Qué riesgo representa?',
    answer: 'Prompt Injection',
    acceptedAnswers: [
      'prompt injection',
      'inyección de prompt',
      'indirect prompt injection',
    ],
    explanation:
      'Prompt Injection busca manipular el comportamiento del modelo mediante instrucciones no confiables.',
    keyConcept: 'Prompt Injection',
    timeLimit: 30,
  },
];