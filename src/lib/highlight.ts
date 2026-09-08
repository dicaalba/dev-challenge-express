import type { CodeLanguage } from '../types';

/**
 * Resaltador de sintaxis mínimo y sin dependencias.
 *
 * No pretende ser un tokenizador completo: cubre lo suficiente para retos
 * cortos (palabras clave, strings, comentarios, números, funciones) sin añadir
 * peso al bundle. Devuelve tokens tipados que el componente CodeBlock pinta con
 * CSS, evitando inyectar HTML.
 */

export type TokenType =
  | 'keyword'
  | 'string'
  | 'comment'
  | 'number'
  | 'function'
  | 'operator'
  | 'punctuation'
  | 'plain';

export interface Token {
  type: TokenType;
  value: string;
}

/** Palabras clave por lenguaje (usadas para el resaltado). */
const KEYWORDS: Partial<Record<CodeLanguage, Set<string>>> = {
  javascript: new Set([
    'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while',
    'do', 'switch', 'case', 'break', 'continue', 'new', 'class', 'extends',
    'this', 'typeof', 'instanceof', 'await', 'async', 'try', 'catch', 'finally',
    'throw', 'import', 'export', 'from', 'default', 'null', 'undefined', 'true',
    'false', 'in', 'of', 'void', 'delete',
  ]),
  typescript: new Set([
    'var', 'let', 'const', 'function', 'return', 'if', 'else', 'for', 'while',
    'do', 'switch', 'case', 'break', 'continue', 'new', 'class', 'extends',
    'this', 'typeof', 'instanceof', 'await', 'async', 'try', 'catch', 'finally',
    'throw', 'import', 'export', 'from', 'default', 'null', 'undefined', 'true',
    'false', 'in', 'of', 'void', 'delete', 'interface', 'type', 'enum',
    'implements', 'public', 'private', 'protected', 'readonly', 'as', 'string',
    'number', 'boolean', 'any', 'unknown', 'never',
  ]),
  python: new Set([
    'def', 'return', 'if', 'elif', 'else', 'for', 'while', 'break', 'continue',
    'class', 'import', 'from', 'as', 'try', 'except', 'finally', 'raise', 'with',
    'lambda', 'None', 'True', 'False', 'and', 'or', 'not', 'in', 'is', 'pass',
    'print', 'self', 'yield', 'global', 'nonlocal',
  ]),
  bash: new Set([
    'if', 'then', 'else', 'elif', 'fi', 'for', 'while', 'do', 'done', 'case',
    'esac', 'function', 'return', 'export', 'echo', 'cd', 'sudo', 'apt', 'npm',
    'aws', 'kubectl', 'docker', 'terraform', 'git',
  ]),
};

const IDENT_RE = /[A-Za-z_$][\w$]*/y;
const NUMBER_RE = /\d+(\.\d+)?/y;
const WHITESPACE_RE = /\s+/y;
const OPERATOR_CHARS = new Set([
  '+', '-', '*', '/', '%', '=', '<', '>', '!', '&', '|', '^', '~', '?', ':',
]);
const PUNCTUATION_CHARS = new Set(['(', ')', '[', ']', '{', '}', ',', ';', '.']);

/** Delimitadores de comentario de línea por lenguaje. */
function lineCommentToken(lang: CodeLanguage): string | null {
  switch (lang) {
    case 'python':
    case 'bash':
    case 'yaml':
      return '#';
    case 'javascript':
    case 'typescript':
      return '//';
    default:
      return null;
  }
}

/**
 * Tokeniza una cadena de código en tokens tipados.
 * Para 'json', 'yaml' y 'plaintext' aplica un resaltado básico (strings,
 * números, comentarios) sin palabras clave.
 */
export function tokenize(code: string, language: CodeLanguage): Token[] {
  const keywords = KEYWORDS[language] ?? new Set<string>();
  const lineComment = lineCommentToken(language);
  const tokens: Token[] = [];
  let i = 0;
  const n = code.length;

  const push = (type: TokenType, value: string) => {
    if (value) tokens.push({ type, value });
  };

  while (i < n) {
    const char = code[i];

    // Espacios en blanco (se conservan como 'plain').
    WHITESPACE_RE.lastIndex = i;
    const ws = WHITESPACE_RE.exec(code);
    if (ws && ws.index === i) {
      push('plain', ws[0]);
      i += ws[0].length;
      continue;
    }

    // Comentarios de bloque JS/TS.
    if (
      (language === 'javascript' || language === 'typescript') &&
      char === '/' &&
      code[i + 1] === '*'
    ) {
      const end = code.indexOf('*/', i + 2);
      const stop = end === -1 ? n : end + 2;
      push('comment', code.slice(i, stop));
      i = stop;
      continue;
    }

    // Comentarios de línea.
    if (lineComment && code.startsWith(lineComment, i)) {
      const end = code.indexOf('\n', i);
      const stop = end === -1 ? n : end;
      push('comment', code.slice(i, stop));
      i = stop;
      continue;
    }

    // Strings con comillas simples, dobles o backticks.
    if (char === '"' || char === "'" || char === '`') {
      let j = i + 1;
      while (j < n && code[j] !== char) {
        if (code[j] === '\\') j++; // saltar escape
        j++;
      }
      const stop = Math.min(j + 1, n);
      push('string', code.slice(i, stop));
      i = stop;
      continue;
    }

    // Números.
    NUMBER_RE.lastIndex = i;
    const num = NUMBER_RE.exec(code);
    if (num && num.index === i) {
      push('number', num[0]);
      i += num[0].length;
      continue;
    }

    // Identificadores: palabra clave, función o texto plano.
    IDENT_RE.lastIndex = i;
    const ident = IDENT_RE.exec(code);
    if (ident && ident.index === i) {
      const word = ident[0];
      if (keywords.has(word)) {
        push('keyword', word);
      } else if (code[i + word.length] === '(') {
        push('function', word);
      } else {
        push('plain', word);
      }
      i += word.length;
      continue;
    }

    // Operadores y puntuación.
    if (OPERATOR_CHARS.has(char)) {
      push('operator', char);
      i += 1;
      continue;
    }
    if (PUNCTUATION_CHARS.has(char)) {
      push('punctuation', char);
      i += 1;
      continue;
    }

    // Cualquier otro carácter.
    push('plain', char);
    i += 1;
  }

  return tokens;
}
