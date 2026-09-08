import styles from './SessionBadge.module.css';

interface SessionBadgeProps {
  count: number;
}

/** Contador local de retos completados durante la sesión/evento. */
export function SessionBadge({ count }: SessionBadgeProps) {
  return (
    <div className={styles.badge} aria-label={`Retos completados: ${count}`}>
      <span className={styles.icon} aria-hidden="true">
        ⚡
      </span>
      <span className={styles.count}>{count}</span>
      <span className={styles.label}>completados</span>
    </div>
  );
}
