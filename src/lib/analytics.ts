/**
 * Abstracción simple de analytics.
 *
 * En el MVP registra en consola (no persistente, sin datos personales).
 * En el futuro se puede sustituir la implementación por una que envíe
 * a CloudWatch, una API propia, etc., sin tocar el resto de la app.
 */

/** Nombres de eventos soportados. */
export type AnalyticsEvent =
  | 'challenge_started'
  | 'category_selected'
  | 'challenge_completed'
  | 'answer_revealed'
  | 'session_finished';

/** Propiedades opcionales del evento (nunca información personal). */
export type AnalyticsPayload = Record<string, string | number | boolean | undefined>;

/** Contrato de cualquier implementación de analytics. */
export interface Analytics {
  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void;
}

/** Implementación de MVP: escribe en consola en modo debug. */
export class ConsoleAnalytics implements Analytics {
  track(event: AnalyticsEvent, payload?: AnalyticsPayload): void {
    // Solo logging local, sin envío externo ni datos personales.
    // eslint-disable-next-line no-console
    console.debug(`[analytics] ${event}`, payload ?? {});
  }
}

/** Instancia por defecto usada por la app. */
export const analytics: Analytics = new ConsoleAnalytics();
