import styles from './Timer.module.css';

interface TimerProps {
  secondsLeft: number;
  totalSeconds: number;
  isExpired: boolean;
}

/**
 * Temporizador visual (círculo + segundos).
 * Es informativo: al expirar muestra "¡Tiempo!" pero no bloquea nada.
 */
export function Timer({ secondsLeft, totalSeconds, isExpired }: TimerProps) {
  const progress = totalSeconds > 0 ? secondsLeft / totalSeconds : 0;
  // Estado de color: normal -> aviso -> expirado.
  const state = isExpired ? 'expired' : progress <= 0.25 ? 'warn' : 'ok';

  return (
    <div
      className={`${styles.timer} ${styles[state]}`}
      role="timer"
      aria-live="polite"
      aria-label={
        isExpired
          ? 'El tiempo llegó a cero. Puedes seguir respondiendo.'
          : `Tiempo restante: ${secondsLeft} segundos`
      }
    >
      <span className={styles.seconds}>{secondsLeft}</span>
      <span className={styles.unit}>{isExpired ? '¡Tiempo!' : 'seg'}</span>
    </div>
  );
}
