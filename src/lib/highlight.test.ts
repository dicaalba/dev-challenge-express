import { describe, it, expect } from 'vitest';
import { tokenize } from './highlight';

describe('tokenize', () => {
  it('reconstruye el código original al concatenar los tokens', () => {
    const code = 'const x = 1; // nota\nfoo("hola");';
    const tokens = tokenize(code, 'javascript');
    expect(tokens.map((t) => t.value).join('')).toBe(code);
  });

  it('marca las palabras clave del lenguaje', () => {
    const tokens = tokenize('const x = 1', 'javascript');
    const keyword = tokens.find((t) => t.value === 'const');
    expect(keyword?.type).toBe('keyword');
  });

  it('marca strings, números y comentarios', () => {
    const tokens = tokenize('let s = "hola"; // fin\nlet n = 42', 'javascript');
    expect(tokens.some((t) => t.type === 'string' && t.value === '"hola"')).toBe(true);
    expect(tokens.some((t) => t.type === 'number' && t.value === '42')).toBe(true);
    expect(tokens.some((t) => t.type === 'comment')).toBe(true);
  });

  it('identifica llamadas a función', () => {
    const tokens = tokenize('console.log(x)', 'javascript');
    expect(tokens.some((t) => t.type === 'function' && t.value === 'log')).toBe(true);
  });

  it('usa # como comentario en python', () => {
    const tokens = tokenize('x = 1  # comentario', 'python');
    expect(tokens.some((t) => t.type === 'comment' && t.value.includes('#'))).toBe(true);
  });

  it('no rompe con plaintext (todo reconstruible)', () => {
    const code = 'texto simple sin sintaxis';
    const tokens = tokenize(code, 'plaintext');
    expect(tokens.map((t) => t.value).join('')).toBe(code);
  });
});
