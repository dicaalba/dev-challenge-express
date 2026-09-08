import { useCallback, useEffect, useRef, useState } from 'react';

export interface CountdownState {
  /** Segundos restantes (nunca baja de 0). */
  secondsLeft: number;
  /** true cuando llegó a 0. No bloquea ninguna interacción. */
  isExpired: boolean;
  /** true mientras el conteo está activo. */
  isRunning: boolean;
}

export interface CountdownControls extends CountdownState {
  /** Reinicia el conteo, opcionalmente con una nueva duración. */
  reset: (newSeconds?: number) => void;
  /** Detiene el conteo sin resetear el valor mostrado. */
  stop: () => void;
}

/**
 * Temporizador de cuenta regresiva por segundos.
 *
 * Diseño intencional: al expirar NO dispara ningún bloqueo ni auto-navegación.
 * Solo marca `isExpired = true` para que la UI muestre el estado (ej. "¡Tiempo!"),
 * manteniendo todos los controles utilizables. El usuario decide cuándo avanzar.
 */
export function useCountdown(initialSeconds: number): CountdownControls {
  const [secondsLeft, setSecondsLeft] = useState(initialSeconds);
  const [isRunning, setIsRunning] = useState(initialSeconds > 0);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const clear = useCallback(() => {
    if (intervalRef.current !== null) {
      clearInterval(intervalRef.current);
      intervalRef.current = null;
    }
  }, []);

  const stop = useCallback(() => {
    clear();
    setIsRunning(false);
  }, [clear]);

  const reset = useCallback(
    (newSeconds?: number) => {
      clear();
      const next = newSeconds ?? initialSeconds;
      setSecondsLeft(next);
      setIsRunning(next > 0);
    },
    [clear, initialSeconds],
  );

  useEffect(() => {
    if (!isRunning) {
      return;
    }
    intervalRef.current = setInterval(() => {
      setSecondsLeft((prev) => {
        if (prev <= 1) {
          // Llegamos a 0: detenemos el intervalo pero NO bloqueamos nada.
          clear();
          setIsRunning(false);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return clear;
  }, [isRunning, clear]);

  // Limpieza al desmontar.
  useEffect(() => clear, [clear]);

  return {
    secondsLeft,
    isExpired: secondsLeft === 0,
    isRunning,
    reset,
    stop,
  };
}
