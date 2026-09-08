import type { ReactNode } from 'react';
import styles from './Chip.module.css';

interface ChipProps {
  children: ReactNode;
  /** Color de acento opcional (por defecto violeta). */
  accent?: string;
}

/** Etiqueta compacta para categoría, nivel o concepto. */
export function Chip({ children, accent }: ChipProps) {
  return (
    <span
      className={styles.chip}
      style={accent ? { borderColor: accent, color: accent } : undefined}
    >
      {children}
    </span>
  );
}
