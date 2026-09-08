import type { ChallengeLevel, ChallengeType } from '../types';

/** Etiquetas legibles (español) para el nivel de dificultad. */
export const LEVEL_LABELS: Record<ChallengeLevel, string> = {
  easy: 'Fácil',
  medium: 'Medio',
  advanced: 'Avanzado',
};

/** Etiquetas legibles (español) para el tipo de reto. */
export const TYPE_LABELS: Record<ChallengeType, string> = {
  'multiple-choice': 'Opción múltiple',
  'true-false': 'Verdadero / Falso',
  open: 'Respuesta abierta',
  debug: 'Debug this',
  architecture: 'Arquitectura',
};
