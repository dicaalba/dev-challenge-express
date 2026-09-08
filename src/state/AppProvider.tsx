import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useReducer,
  type ReactNode,
} from 'react';
import type { Challenge, ChallengeCategory } from '../types';
import {
  getRandomChallenge,
  pickRandomCategory,
} from '../data/challengeRepository';
import { analytics } from '../lib/analytics';
import { appReducer, initialState, type AppState } from './appState';

/** API de alto nivel que consume la UI. */
export interface AppContextValue extends AppState {
  /** Home -> pantalla de categorías. */
  start: () => void;
  /** Selecciona categoría; si es null, elige una al azar ("Sorpréndeme"). */
  selectCategory: (category: ChallengeCategory | null) => void;
  /** Revela la respuesta del reto actual (cuenta como completado). */
  revealAnswer: () => void;
  /** Otro reto de la misma categoría, sin repetir el actual. */
  nextChallenge: () => void;
  /** Volver a elegir categoría. */
  changeCategory: () => void;
  /** Ir a la pantalla final. */
  finish: () => void;
  /** Nuevo participante: limpia el estado y vuelve al Home. */
  reset: () => void;
}

const AppContext = createContext<AppContextValue | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(appReducer, initialState);

  const start = useCallback(() => {
    dispatch({ type: 'START' });
  }, []);

  const selectCategory = useCallback(
    (category: ChallengeCategory | null) => {
      // "Sorpréndeme": categoría aleatoria cuando no se especifica.
      const resolved = category ?? pickRandomCategory();
      const surprise = category === null;
      analytics.track('category_selected', {
        category: resolved,
        surprise,
      });

      const challenge: Challenge = getRandomChallenge(resolved, null);
      analytics.track('challenge_started', {
        category: resolved,
        challengeId: challenge.id,
        level: challenge.level,
        type: challenge.type,
      });
      dispatch({ type: 'SELECT_CATEGORY', category: resolved, challenge });
    },
    [],
  );

  const revealAnswer = useCallback(() => {
    const current = state.currentChallenge;
    if (current) {
      analytics.track('answer_revealed', { challengeId: current.id });
      analytics.track('challenge_completed', {
        challengeId: current.id,
        category: current.category,
      });
    }
    dispatch({ type: 'REVEAL_ANSWER' });
  }, [state.currentChallenge]);

  const nextChallenge = useCallback(() => {
    const category = state.category;
    if (!category) {
      return;
    }
    const previousId = state.currentChallenge?.id ?? null;
    const challenge = getRandomChallenge(category, previousId);
    analytics.track('challenge_started', {
      category,
      challengeId: challenge.id,
      level: challenge.level,
      type: challenge.type,
    });
    dispatch({ type: 'NEXT_CHALLENGE', challenge });
  }, [state.category, state.currentChallenge]);

  const changeCategory = useCallback(() => {
    dispatch({ type: 'GO_TO_CATEGORIES' });
  }, []);

  const finish = useCallback(() => {
    analytics.track('session_finished', {
      completed: state.completedCount,
    });
    dispatch({ type: 'FINISH' });
  }, [state.completedCount]);

  const reset = useCallback(() => {
    dispatch({ type: 'RESET' });
  }, []);

  const value = useMemo<AppContextValue>(
    () => ({
      ...state,
      start,
      selectCategory,
      revealAnswer,
      nextChallenge,
      changeCategory,
      finish,
      reset,
    }),
    [
      state,
      start,
      selectCategory,
      revealAnswer,
      nextChallenge,
      changeCategory,
      finish,
      reset,
    ],
  );

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

/** Hook de acceso al estado y acciones de la app. */
export function useApp(): AppContextValue {
  const ctx = useContext(AppContext);
  if (!ctx) {
    throw new Error('useApp debe usarse dentro de <AppProvider>');
  }
  return ctx;
}
