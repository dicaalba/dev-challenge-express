import { useState } from 'react';
import { Button } from '../components/Button';
import { Chip } from '../components/Chip';
import { CodeBlock } from '../components/CodeBlock';
import { ScreenLayout } from '../components/ScreenLayout';
import { SessionBadge } from '../components/SessionBadge';
import { Timer } from '../components/Timer';
import { CATEGORY_MAP } from '../config/categories';
import { useCountdown } from '../hooks/useCountdown';
import { isCorrectOption } from '../lib/answers';
import { LEVEL_LABELS, TYPE_LABELS } from '../lib/labels';
import type { Challenge } from '../types';
import { useApp } from '../state/AppProvider';
import styles from './ChallengeScreen.module.css';

/**
 * Contenido del reto. Se extrae para poder remontarlo con `key` (id del reto)
 * y así reiniciar el temporizador limpiamente en cada reto.
 */
function ChallengeContent({ challenge }: { challenge: Challenge }) {
  const { revealAnswer, completedCount } = useApp();
  const { secondsLeft, isExpired } = useCountdown(challenge.timeLimit);
  const meta = CATEGORY_MAP[challenge.category];
  const hasOptions =
    Array.isArray(challenge.options) && challenge.options.length > 0;

  // Opción seleccionada por el participante (feedback inmediato).
  const [selected, setSelected] = useState<string | null>(null);

  return (
    <ScreenLayout
      label="Reto"
      topBar={
        <>
          <div className={styles.meta}>
            <Chip accent={meta.accent}>
              {meta.emoji} {meta.label}
            </Chip>
            <Chip>{LEVEL_LABELS[challenge.level]}</Chip>
          </div>
          <SessionBadge count={completedCount} />
        </>
      }
    >
      <Timer
        secondsLeft={secondsLeft}
        totalSeconds={challenge.timeLimit}
        isExpired={isExpired}
      />

      <p className={styles.type}>{TYPE_LABELS[challenge.type]}</p>

      <h2 className={styles.question}>{challenge.question}</h2>

      {challenge.code && (
        <CodeBlock code={challenge.code} language={challenge.language} />
      )}

      {hasOptions && (
        <ul className={styles.options}>
          {challenge.options!.map((option, index) => {
            const isSelected = selected === option;
            const isCorrect = isCorrectOption(option, challenge);
            // El estado (correcto/incorrecto) solo se revela tras elegir.
            let stateClass = '';
            if (selected !== null) {
              if (isCorrect) {
                stateClass = styles.correct;
              } else if (isSelected) {
                stateClass = styles.incorrect;
              }
            }

            return (
              <li key={option}>
                <button
                  type="button"
                  className={`${styles.option} ${stateClass}`}
                  aria-pressed={isSelected}
                  onClick={() => setSelected(option)}
                >
                  <span className={styles.optionKey} aria-hidden="true">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className={styles.optionText}>{option}</span>
                  {selected !== null && isCorrect && (
                    <span className={styles.mark} aria-hidden="true">
                      ✓
                    </span>
                  )}
                  {selected !== null && isSelected && !isCorrect && (
                    <span className={styles.mark} aria-hidden="true">
                      ✕
                    </span>
                  )}
                </button>
              </li>
            );
          })}
        </ul>
      )}

      <Button size="lg" onClick={revealAnswer}>
        Ver respuesta
      </Button>
    </ScreenLayout>
  );
}

/** Pantalla 3 — Challenge. */
export function ChallengeScreen() {
  const { currentChallenge } = useApp();
  if (!currentChallenge) {
    return null;
  }
  // key por id: reinicia el temporizador al cambiar de reto.
  return <ChallengeContent key={currentChallenge.id} challenge={currentChallenge} />;
}
