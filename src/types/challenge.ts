/**
 * Modelo de datos central de Dev Challenge Express.
 *
 * Estos tipos son el contrato entre el banco de preguntas y la interfaz.
 * Mantenerlos estables permite, en el futuro, servir las preguntas desde
 * DynamoDB / API Gateway sin cambiar los componentes de UI.
 */

/** Categorías temáticas de los retos. */
export type ChallengeCategory =
  | 'cloud'
  | 'code'
  | 'devops'
  | 'security'
  | 'genai'
  | 'boss';

/** Nivel de dificultad. Determina, junto al tipo, el tiempo del reto. */
export type ChallengeLevel = 'easy' | 'medium' | 'advanced';

/**
 * Tipo de reto. Los tipos "¿Qué servicio usarías?" y "¿Qué harías?"
 * del enunciado se modelan como 'open' (respuesta abierta / recomendada),
 * ya que su UI es idéntica: enunciado + respuesta recomendada.
 */
export type ChallengeType =
  | 'multiple-choice'
  | 'true-false'
  | 'open'
  | 'debug'
  | 'architecture';

/**
 * Lenguaje del bloque de código de un reto.
 * Determina el resaltado de sintaxis aplicado.
 */
export type CodeLanguage =
  | 'javascript'
  | 'typescript'
  | 'python'
  | 'bash'
  | 'json'
  | 'yaml'
  | 'plaintext';

/** Un reto individual del banco de preguntas. */
export interface Challenge {
  /** Identificador único y estable (útil para analytics y futura persistencia). */
  id: string;
  category: ChallengeCategory;
  level: ChallengeLevel;
  type: ChallengeType;
  /** Enunciado del reto (prosa, sin código embebido). */
  question: string;
  /**
   * Fragmento de código asociado al reto (opcional).
   * Se separa del enunciado para renderizarlo con resaltado de sintaxis.
   */
  code?: string;
  /** Lenguaje del bloque `code` (por defecto 'plaintext'). */
  language?: CodeLanguage;
  /** Opciones para multiple-choice / true-false. Ausente en respuestas abiertas. */
  options?: string[];
  /** Respuesta correcta o recomendada (texto mostrado en la pantalla de respuesta). */
  answer: string;
  /** Otras respuestas consideradas válidas (para retos abiertos). */
  acceptedAnswers?: string[];
  /** Explicación breve del porqué. */
  explanation: string;
  /** Concepto clave asociado (etiqueta corta). */
  keyConcept?: string;
  /** Tiempo del reto en segundos. */
  timeLimit: number;
}
