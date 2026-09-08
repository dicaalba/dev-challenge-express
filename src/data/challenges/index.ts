import type { Challenge, ChallengeCategory } from '../../types';
import { cloudChallenges } from './cloud';
import { codeChallenges } from './code';
import { devopsChallenges } from './devops';
import { securityChallenges } from './security';
import { genaiChallenges } from './genai';
import { bossChallenges } from './boss';

/**
 * Banco de preguntas agrupado por categoría.
 *
 * Esta es la única fuente de datos del MVP (parte del bundle).
 * El repositorio (challengeRepository) lee de aquí; en el futuro
 * podría leer de una API sin que la UI se entere.
 */
export const CHALLENGES_BY_CATEGORY: Record<ChallengeCategory, Challenge[]> = {
  cloud: cloudChallenges,
  code: codeChallenges,
  devops: devopsChallenges,
  security: securityChallenges,
  genai: genaiChallenges,
  boss: bossChallenges,
};

/** Todos los retos en una sola lista. */
export const ALL_CHALLENGES: Challenge[] = Object.values(
  CHALLENGES_BY_CATEGORY,
).flat();
