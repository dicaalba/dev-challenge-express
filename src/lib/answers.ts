import type { Challenge } from '../types';

/**
 * Normaliza una respuesta para comparar sin diferencias irrelevantes:
 * minúsculas, sin acentos y sin espacios sobrantes.
 */
export function normalizeAnswer(value: string): string {
  return value
    .trim()
    .toLowerCase()
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, ''); // quita diacríticos
}

/**
 * Indica si una opción es la respuesta correcta del reto.
 * Considera `answer` y las `acceptedAnswers`.
 */
export function isCorrectOption(option: string, challenge: Challenge): boolean {
  const target = normalizeAnswer(option);
  if (normalizeAnswer(challenge.answer) === target) {
    return true;
  }
  return (challenge.acceptedAnswers ?? []).some(
    (accepted) => normalizeAnswer(accepted) === target,
  );
}
