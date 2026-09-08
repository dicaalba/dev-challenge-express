import { describe, it, expect } from 'vitest';
import {
  getChallengesByCategory,
  getRandomChallenge,
  pickRandomCategory,
} from './challengeRepository';
import { CATEGORY_IDS } from '../config/categories';
import type { ChallengeCategory } from '../types';

describe('challengeRepository', () => {
  it('cada categoría tiene al menos 10 retos', () => {
    for (const category of CATEGORY_IDS) {
      const pool = getChallengesByCategory(category);
      expect(pool.length).toBeGreaterThanOrEqual(10);
    }
  });

  it('los retos boss duran 60 segundos y los demás 30', () => {
    for (const category of CATEGORY_IDS) {
      for (const challenge of getChallengesByCategory(category)) {
        if (category === 'boss') {
          expect(challenge.timeLimit).toBe(60);
        } else {
          expect(challenge.timeLimit).toBe(30);
        }
      }
    }
  });

  it('getRandomChallenge devuelve un reto de la categoría pedida', () => {
    const challenge = getRandomChallenge('cloud', null, () => 0);
    expect(challenge.category).toBe('cloud');
  });

  it('no repite inmediatamente el mismo reto al pedir el siguiente', () => {
    const category: ChallengeCategory = 'code';
    const pool = getChallengesByCategory(category);

    // Simulamos varias rondas: el nuevo reto nunca debe ser el previo.
    let previousId: string | null = null;
    // rng variable para forzar distintas selecciones.
    const rngs = [0, 0.2, 0.4, 0.6, 0.8, 0.99, 0.1, 0.5, 0.9];
    for (const r of rngs) {
      const next = getRandomChallenge(category, previousId, () => r);
      if (previousId !== null && pool.length > 1) {
        expect(next.id).not.toBe(previousId);
      }
      previousId = next.id;
    }
  });

  it('pickRandomCategory devuelve una categoría válida', () => {
    const category = pickRandomCategory(() => 0.5);
    expect(CATEGORY_IDS).toContain(category);
  });

  it('lanza si la categoría no tiene retos', () => {
    expect(() =>
      getRandomChallenge('inexistente' as ChallengeCategory, null, () => 0),
    ).toThrow();
  });
});
