import styles from './QrCode.module.css';

interface QrCodeProps {
  /** URL a codificar. */
  url: string;
  /** Texto accesible/etiqueta. */
  caption?: string;
  size?: number;
}

/**
 * QR sin dependencias adicionales.
 *
 * Usa un servicio público de generación de QR (configurable) para no añadir
 * peso al bundle. Si en el futuro se prefiere generación 100% offline, basta
 * con sustituir este componente por una librería local sin tocar la UI que lo usa.
 */
export function QrCode({ url, caption, size = 180 }: QrCodeProps) {
  const src = `https://api.qrserver.com/v1/create-qr-code/?size=${size}x${size}&margin=8&data=${encodeURIComponent(
    url,
  )}`;

  return (
    <figure className={styles.wrapper}>
      <img
        className={styles.img}
        src={src}
        width={size}
        height={size}
        alt={caption ? `Código QR hacia ${caption}` : `Código QR hacia ${url}`}
        loading="lazy"
      />
      {caption && <figcaption className={styles.caption}>{caption}</figcaption>}
    </figure>
  );
}
