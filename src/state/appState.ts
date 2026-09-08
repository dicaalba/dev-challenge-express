import type { Challenge, ChallengeCategory } from '../types';

/** Pantallas de la aplicación (máquina de estados de navegación). */
export type Screen = 'home' | 'categories' | 'challenge' | 'answer' | 'final';

/** Estado global de la app. */
export interface AppState {
  screen: Screen;
  /** Categoría actualmente seleccionada (null en home/categorías). */
  category: ChallengeCategory | null;
  /** Reto que se está mostrando (null fuera de challenge/answer). */
  currentChallenge: Challenge | null;
  /** Retos completados durante la sesión/evento (gamificación local). */
  completedCount: number;
}

/** Estado inicial (nuevo participante). */
export const initialState: AppState = {
  screen: 'home',
  category: null,
  currentChallenge: null,
  completedCount: 0,
};

/** Acciones que pueden mutar el estado. */
export type AppAction =
  | { type: 'START' } // Home -> selección de categoría
  | { type: 'SELECT_CATEGORY'; category: ChallengeCategory; challenge: Challenge }
  | { type: 'REVEAL_ANSWER' } // Challenge -> respuesta (cuenta como completado)
  | { type: 'NEXT_CHALLENGE'; challenge: Challenge } // otro reto de la misma categoría
  | { type: 'GO_TO_CATEGORIES' } // cambiar categoría
  | { type: 'FINISH' } // ir a pantalla final
  | { type: 'RESET' }; // nuevo participante -> home limpio

/**
 * Reducer puro de la aplicación.
 * No produce efectos secundarios (analytics se dispara desde el contexto).
 */
export function appReducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'START':
      return { ...state, screen: 'categories', category: null, currentChallenge: null };

    case 'SELECT_CATEGORY':
      return {
        ...state,
        screen: 'challenge',
        category: action.category,
        currentChallenge: action.challenge,
      };

    case 'REVEAL_ANSWER':
      return {
        ...state,
        screen: 'answer',
        completedCount: state.completedCount + 1,
      };

    case 'NEXT_CHALLENGE':
      return {
        ...state,
        screen: 'challenge',
        currentChallenge: action.challenge,
      };

    case 'GO_TO_CATEGORIES':
      return {
        ...state,
        screen: 'categories',
        category: null,
        currentChallenge: null,
      };

    case 'FINISH':
      return { ...state, screen: 'final' };

    case 'RESET':
      // Nuevo participante: limpia todo, incluido el contador de sesión.
      return { ...initialState };

    default:
      return state;
  }
}
