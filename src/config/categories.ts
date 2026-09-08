import type { ChallengeCategory } from '../types';

/**
 * Metadatos de presentación de cada categoría.
 * Se mantienen fuera de los componentes para que la UI sea puramente
 * declarativa y las categorías se puedan reordenar/renombrar sin tocar JSX.
 */
export interface CategoryMeta {
  id: ChallengeCategory;
  /** Nombre corto mostrado en las cards. */
  label: string;
  /** Emoji identificador. */
  emoji: string;
  /** Descripción breve accesible (aria / subtítulo). */
  description: string;
  /** Color de acento (usado en degradados de las cards). */
  accent: string;
}

/** Orden y metadatos de las 6 categorías iniciales. */
export const CATEGORIES: readonly CategoryMeta[] = [
  {
    id: 'cloud',
    label: 'Cloud',
    emoji: '☁️',
    description: 'Servicios y arquitectura en la nube',
    accent: '#38bdf8',
  },
  {
    id: 'code',
    label: 'Code',
    emoji: '</>',
    description: 'Programación y lógica',
    accent: '#a855f7',
  },
  {
    id: 'devops',
    label: 'DevOps',
    emoji: '⚙️',
    description: 'CI/CD, automatización e infraestructura',
    accent: '#22c55e',
  },
  {
    id: 'security',
    label: 'Security',
    emoji: '🔐',
    description: 'Seguridad y buenas prácticas',
    accent: '#f59e0b',
  },
  {
    id: 'genai',
    label: 'GenAI',
    emoji: '🤖',
    description: 'IA generativa y LLMs',
    accent: '#ec4899',
  },
  {
    id: 'boss',
    label: 'Boss Level',
    emoji: '🔥',
    description: 'Retos avanzados combinados',
    accent: '#ef4444',
  },
] as const;

/** Acceso rápido a los metadatos por id de categoría. */
export const CATEGORY_MAP: Record<ChallengeCategory, CategoryMeta> =
  CATEGORIES.reduce(
    (acc, cat) => {
      acc[cat.id] = cat;
      return acc;
    },
    {} as Record<ChallengeCategory, CategoryMeta>,
  );

/** Lista de ids de categoría (para selección aleatoria "Sorpréndeme"). */
export const CATEGORY_IDS: readonly ChallengeCategory[] = CATEGORIES.map(
  (c) => c.id,
);
