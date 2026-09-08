import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { ScreenLayout } from '../components/ScreenLayout';
import { SessionBadge } from '../components/SessionBadge';
import { CATEGORY_MAP } from '../config/categories';
import { useApp } from '../state/AppProvider';
import styles from './AnswerScreen.module.css';

/** Pantalla 4 — Respuesta. Animación breve al revelar + acciones. */
export function AnswerScreen() {
  const {
    currentChallenge,
    completedCount,
    nextChallenge,
    changeCategory,
    finish,
  } = useApp();

  if (!currentChallenge) {
    return null;
  }
  const meta = CATEGORY_MAP[currentChallenge.category];

  return (
    <ScreenLayout
      label="Respuesta"
      topBar={<SessionBadge count={completedCount} />}
    >
      <div className={styles.reveal}>
        <p className={styles.sectionLabel}>Respuesta</p>
        <p className={styles.answer}>{currentChallenge.answer}</p>

        <div className={styles.block}>
          <p className={styles.sectionLabel}>¿Por qué?</p>
          <p className={styles.explanation}>{currentChallenge.explanation}</p>
        </div>

        <div className={styles.chips}>
          {currentChallenge.keyConcept && (
            <Chip accent={meta.accent}>💡 {currentChallenge.keyConcept}</Chip>
          )}
        </div>

        {currentChallenge.acceptedAnswers &&
          currentChallenge.acceptedAnswers.length > 0 && (
            <p className={styles.accepted}>
              También válidas: {currentChallenge.acceptedAnswers.join(' · ')}
            </p>
          )}
      </div>

      <div className={styles.actions}>
        <Button onClick={nextChallenge}>Otro reto</Button>
        <Button variant="secondary" onClick={changeCategory}>
          Cambiar categoría
        </Button>
        <Button variant="ghost" onClick={finish}>
          Finalizar
        </Button>
      </div>
    </ScreenLayout>
  );
}
