import type { ReactNode } from 'react';
import styles from './ScreenLayout.module.css';

interface ScreenLayoutProps {
  children: ReactNode;
  /** Contenido superior opcional (badges, contador...). */
  topBar?: ReactNode;
  /** Etiqueta accesible de la pantalla (aria-label del main). */
  label: string;
}

/**
 * Contenedor de pantalla completa que centra el contenido y controla el scroll.
 * Cada pantalla es un <main> con su propia etiqueta accesible.
 */
export function ScreenLayout({ children, topBar, label }: ScreenLayoutProps) {
  return (
    <main className={styles.screen} aria-label={label}>
      {topBar && <div className={styles.topBar}>{topBar}</div>}
      <div className={styles.content}>{children}</div>
    </main>
  );
}
