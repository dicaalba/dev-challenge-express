import { describe, it, expect } from 'vitest';
import { pickRandom, pickRandomAvoiding, type Rng } from './random';

describe('pickRandom', () => {
  it('devuelve un elemento del array', () => {
    const items = ['a', 'b', 'c'];
    const result = pickRandom(items, () => 0.5);
    expect(items).toContain(result);
  });

  it('usa el rng para determinar el índice', () => {
    const items = ['a', 'b', 'c', 'd'];
    // rng = 0 -> índice 0; rng ~1 -> último índice.
    expect(pickRandom(items, () => 0)).toBe('a');
    expect(pickRandom(items, () => 0.999)).toBe('d');
  });

  it('lanza si el array está vacío', () => {
    expect(() => pickRandom([], () => 0)).toThrow();
  });

  it('cubre todos los elementos con distintos valores de rng', () => {
    const items = [10, 20, 30];
    const seen = new Set<number>();
    for (let i = 0; i < items.length; i++) {
      const rng: Rng = () => i / items.length;
      seen.add(pickRandom(items, rng));
    }
    expect(seen.size).toBe(items.length);
  });
});

describe('pickRandomAvoiding', () => {
  it('nunca devuelve el elemento previo cuando hay alternativas', () => {
    const items = ['a', 'b', 'c'];
    // Probamos con todos los valores de rng posibles para el pool filtrado.
    for (let r = 0; r < 1; r += 0.1) {
      const result = pickRandomAvoiding(items, 'a', () => r);
      expect(result).not.toBe('a');
    }
  });

  it('elige libremente cuando previous es null', () => {
    const items = ['a', 'b'];
    expect(pickRandomAvoiding(items, null, () => 0)).toBe('a');
  });

  it('devuelve el único elemento aunque sea el previo', () => {
    const items = ['solo'];
    expect(pickRandomAvoiding(items, 'solo', () => 0)).toBe('solo');
  });

  it('ignora previous si no está en la lista', () => {
    const items = ['a', 'b'];
    const result = pickRandomAvoiding(items, 'x', () => 0);
    expect(result).toBe('a');
  });

  it('lanza si el array está vacío', () => {
    expect(() => pickRandomAvoiding([], null, () => 0)).toThrow();
  });
});
