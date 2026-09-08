import type { Challenge, ChallengeCategory } from '../types';
import { CATEGORY_IDS } from '../config/categories';
import { pickRandom, pickRandomAvoiding, type Rng } from '../lib/random';
import { CHALLENGES_BY_CATEGORY } from './challenges';

/**
 * Repositorio de retos: única fuente de acceso a las preguntas para la UI.
 *
 * Hoy lee del banco incluido en el bundle. Mañana, esta misma capa puede
 * consultar DynamoDB / API Gateway (posiblemente devolviendo Promesas) sin
 * que los componentes cambien su forma de pedir un reto.
 */

/** Devuelve todos los retos de una categoría. */
export function getChallengesByCategory(
  category: ChallengeCategory,
): Challenge[] {
  return CHALLENGES_BY_CATEGORY[category] ?? [];
}

/** Elige una categoría al azar (usado por "Sorpréndeme"). */
export function pickRandomCategory(rng: Rng = Math.random): ChallengeCategory {
  return pickRandom(CATEGORY_IDS, rng);
}

/**
 * Devuelve un reto aleatorio de la categoría, evitando repetir el anterior
 * (identificado por previousId).
 */
export function getRandomChallenge(
  category: ChallengeCategory,
  previousId: string | null = null,
  rng: Rng = Math.random,
): Challenge {
  const pool = getChallengesByCategory(category);
  if (pool.length === 0) {
    throw new Error(`No hay retos para la categoría "${category}"`);
  }
  const previous = previousId
    ? (pool.find((c) => c.id === previousId) ?? null)
    : null;
  return pickRandomAvoiding(pool, previous, rng);
}
