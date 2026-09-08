/**
 * Configuración del evento.
 *
 * Cambiar de evento debe requerir editar SOLO este archivo.
 * Ningún componente debe hardcodear el nombre del evento o los enlaces.
 */
export interface EventConfig {
  eventName: string;
  communityName: string;
  meetupUrl?: string;
  linkedinUrl?: string;
  instagramUrl?: string;
  /**
   * URL a codificar en el QR de la pantalla final.
   * Si se omite, la pantalla final no muestra QR.
   * Suele apuntar a un Linktree o al enlace principal de la comunidad.
   */
  qrUrl?: string;
}

/** Configuración activa. Editar aquí para reutilizar en otro evento. */
export const EVENT_CONFIG: EventConfig = {
  eventName: 'F13 Code Summit 2026',
  communityName: 'AWS Girls Perú',
  meetupUrl: 'https://www.meetup.com/es-es/aws-girls-peru/',
  linkedinUrl: 'https://www.linkedin.com/company/aws-girls-user-group-peru',
  instagramUrl: 'https://www.instagram.com/awsgirlsperu/',
  // Enlace que se mostrará como QR al finalizar (ej. Linktree de la comunidad).
  qrUrl: 'https://awsgirlsperu.com/',
};

/*
 * Ejemplo de reutilización en otro evento (basta reemplazar EVENT_CONFIG):
 *
 * export const EVENT_CONFIG: EventConfig = {
 *   eventName: 'AWS Community Day Lima 2026',
 *   communityName: 'AWS Girls Perú',
 *   qrUrl: 'https://linktr.ee/awsgirlsperu',
 * };
 *
 * Si se omite qrUrl, la pantalla final simplemente no muestra QR.
 */
