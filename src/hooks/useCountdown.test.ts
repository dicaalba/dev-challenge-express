import { describe, it, expect, beforeEach, afterEach, vi } from 'vitest';
import { act, renderHook } from '@testing-library/react';
import { useCountdown } from './useCountdown';

describe('useCountdown', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  it('inicia con los segundos indicados', () => {
    const { result } = renderHook(() => useCountdown(30));
    expect(result.current.secondsLeft).toBe(30);
    expect(result.current.isExpired).toBe(false);
    expect(result.current.isRunning).toBe(true);
  });

  it('decrementa un segundo por tick', () => {
    const { result } = renderHook(() => useCountdown(3));
    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(2);

    act(() => {
      vi.advanceTimersByTime(1000);
    });
    expect(result.current.secondsLeft).toBe(1);
  });

  it('llega a 0 y marca isExpired sin bajar de cero', () => {
    const { result } = renderHook(() => useCountdown(2));
    act(() => {
      vi.advanceTimersByTime(5000);
    });
    expect(result.current.secondsLeft).toBe(0);
    expect(result.current.isExpired).toBe(true);
    expect(result.current.isRunning).toBe(false);
  });

  it('no sigue decrementando después de expirar (no bloquea, solo se detiene)', () => {
    const { result } = renderHook(() => useCountdown(1));
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.secondsLeft).toBe(0);
  });

  it('reset reinicia el conteo con una nueva duración', () => {
    const { result } = renderHook(() => useCountdown(2));
    act(() => {
      vi.advanceTimersByTime(2000);
    });
    expect(result.current.isExpired).toBe(true);

    act(() => {
      result.current.reset(10);
    });
    expect(result.current.secondsLeft).toBe(10);
    expect(result.current.isExpired).toBe(false);
    expect(result.current.isRunning).toBe(true);
  });

  it('stop detiene el conteo sin resetear el valor', () => {
    const { result } = renderHook(() => useCountdown(5));
    act(() => {
      vi.advanceTimersByTime(1000);
      result.current.stop();
    });
    const value = result.current.secondsLeft;
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    expect(result.current.secondsLeft).toBe(value);
    expect(result.current.isRunning).toBe(false);
  });
});
