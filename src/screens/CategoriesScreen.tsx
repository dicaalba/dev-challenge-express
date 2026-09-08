import type { CSSProperties } from 'react';
import { ScreenLayout } from '../components/ScreenLayout';
import { SessionBadge } from '../components/SessionBadge';
import { CATEGORIES } from '../config/categories';
import { useApp } from '../state/AppProvider';
import styles from './CategoriesScreen.module.css';

/** Pantalla 2 — Selección de categoría (cards grandes y táctiles + Sorpréndeme). */
export function CategoriesScreen() {
  const { selectCategory, completedCount } = useApp();

  return (
    <ScreenLayout
      label="Selección de categoría"
      topBar={<SessionBadge count={completedCount} />}
    >
      <h2 className={styles.heading}>Elige tu categoría</h2>

      <ul className={styles.grid}>
        {CATEGORIES.map((cat) => (
          <li key={cat.id}>
            <button
              type="button"
              className={styles.card}
              style={{ '--accent': cat.accent } as CSSProperties}
              onClick={() => selectCategory(cat.id)}
              aria-label={`Categoría ${cat.label}: ${cat.description}`}
            >
              <span className={styles.emoji} aria-hidden="true">
                {cat.emoji}
              </span>
              <span className={styles.label}>{cat.label}</span>
              <span className={styles.desc}>{cat.description}</span>
            </button>
          </li>
        ))}
      </ul>

      <button
        type="button"
        className={styles.surprise}
        onClick={() => selectCategory(null)}
        aria-label="Sorpréndeme: elige una categoría al azar"
      >
        🎲 Sorpréndeme
      </button>
    </ScreenLayout>
  );
}
