import { Button } from '../components/Button';
import { QrCode } from '../components/QrCode';
import { ScreenLayout } from '../components/ScreenLayout';
import { EVENT_CONFIG } from '../config/event';
import { useApp } from '../state/AppProvider';
import styles from './FinalScreen.module.css';

/** Pantalla 5 — Final. Mensaje, QR opcional y nuevo participante. */
export function FinalScreen() {
  const { reset, completedCount } = useApp();

  return (
    <ScreenLayout label="Final">
      <div className={styles.card}>
        <h2 className={styles.title}>Challenge completed ⚡</h2>
        <p className={styles.thanks}>
          Gracias por jugar con {EVENT_CONFIG.communityName} 💜
        </p>

        {completedCount > 0 && (
          <p className={styles.count}>
            Resolviste <strong>{completedCount}</strong>{' '}
            {completedCount === 1 ? 'reto' : 'retos'} en esta sesión.
          </p>
        )}

        {EVENT_CONFIG.qrUrl && (
          <QrCode
            url={EVENT_CONFIG.qrUrl}
            caption={`Conéctate con ${EVENT_CONFIG.communityName}`}
          />
        )}
      </div>

      <Button
        size="lg"
        onClick={reset}
        aria-label="Nuevo participante: reiniciar y volver al inicio"
      >
        Nuevo participante
      </Button>
    </ScreenLayout>
  );
}
