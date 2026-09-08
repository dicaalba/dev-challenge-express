import { Button } from '../components/Button';
import { ScreenLayout } from '../components/ScreenLayout';
import { EVENT_CONFIG } from '../config/event';
import { useApp } from '../state/AppProvider';
import styles from './HomeScreen.module.css';

/** Pantalla 1 — Home. Una sola acción principal: aceptar el reto. */
export function HomeScreen() {
  const { start } = useApp();

  return (
    <ScreenLayout label="Inicio">
      <p className={styles.community}>{EVENT_CONFIG.communityName}</p>

      <h1 className={styles.title}>
        Dev Challenge <span className={styles.express}>Express</span>
      </h1>

      <p className={styles.tagline}>1 reto. 30 segundos. ¿Te animas?</p>

      <Button size="lg" onClick={start} aria-label="Aceptar el reto y empezar">
        Aceptar el reto ⚡
      </Button>

      <p className={styles.event}>{EVENT_CONFIG.eventName}</p>
    </ScreenLayout>
  );
}
