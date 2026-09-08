import { useMemo } from 'react';
import type { CodeLanguage } from '../types';
import { tokenize } from '../lib/highlight';
import styles from './CodeBlock.module.css';

interface CodeBlockProps {
  code: string;
  language?: CodeLanguage;
}

/**
 * Bloque de código con resaltado de sintaxis (sin dependencias externas).
 * Usa el tokenizador propio y pinta cada token con una clase CSS por tipo.
 */
export function CodeBlock({ code, language = 'plaintext' }: CodeBlockProps) {
  const tokens = useMemo(
    () => tokenize(code.replace(/\n+$/, ''), language),
    [code, language],
  );

  return (
    <pre className={styles.pre} aria-label={`Código en ${language}`}>
      <span className={styles.lang} aria-hidden="true">
        {language}
      </span>
      <code className={styles.code}>
        {tokens.map((token, index) => (
          <span key={index} className={styles[token.type]}>
            {token.value}
          </span>
        ))}
      </code>
    </pre>
  );
}
