/**
 * Utilidades de selección aleatoria (funciones puras y testeables).
 *
 * La función de aleatoriedad se inyecta (rng) para poder hacerla
 * determinista en los tests.
 */

/** Fuente de aleatoriedad: devuelve un número en [0, 1). */
export type Rng = () => number;

const defaultRng: Rng = Math.random;

/**
 * Devuelve un elemento aleatorio del array.
 * Lanza si el array está vacío.
 */
export function pickRandom<T>(items: readonly T[], rng: Rng = defaultRng): T {
  if (items.length === 0) {
    throw new Error('pickRandom: el array no puede estar vacío');
  }
  const index = Math.floor(rng() * items.length);
  return items[index];
}

/**
 * Devuelve un elemento aleatorio evitando repetir `previous`.
 *
 * - Si hay más de un elemento, nunca devuelve `previous`.
 * - Si solo hay un elemento, lo devuelve (no hay alternativa).
 * - Si `previous` es null/undefined o no está en la lista, elige libremente.
 */
export function pickRandomAvoiding<T>(
  items: readonly T[],
  previous: T | null | undefined,
  rng: Rng = defaultRng,
): T {
  if (items.length === 0) {
    throw new Error('pickRandomAvoiding: el array no puede estar vacío');
  }
  if (items.length === 1) {
    return items[0];
  }
  const candidates =
    previous == null ? items : items.filter((item) => item !== previous);

  // Si al filtrar no quedó nada (previous era el único distinto), usar todos.
  const pool = candidates.length > 0 ? candidates : items;
  return pickRandom(pool, rng);
}
