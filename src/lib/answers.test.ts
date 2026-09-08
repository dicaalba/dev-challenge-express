import { describe, it, expect } from 'vitest';
import { normalizeAnswer, isCorrectOption } from './answers';
import type { Challenge } from '../types';

const baseChallenge: Challenge = {
  id: 'test-01',
  category: 'code',
  level: 'easy',
  type: 'multiple-choice',
  question: 'pregunta',
  options: ['Amazon S3', 'Amazon EC2'],
  answer: 'Amazon S3',
  explanation: 'porque sí',
  timeLimit: 30,
};

describe('normalizeAnswer', () => {
  it('quita acentos, espacios y mayúsculas', () => {
    expect(normalizeAnswer('  Código Fácil ')).toBe('codigo facil');
  });
});

describe('isCorrectOption', () => {
  it('reconoce la respuesta correcta exacta', () => {
    expect(isCorrectOption('Amazon S3', baseChallenge)).toBe(true);
  });

  it('marca como incorrecta una opción distinta', () => {
    expect(isCorrectOption('Amazon EC2', baseChallenge)).toBe(false);
  });

  it('ignora acentos y mayúsculas al comparar', () => {
    const challenge: Challenge = { ...baseChallenge, answer: 'Verdadero' };
    expect(isCorrectOption('verdadero', challenge)).toBe(true);
  });

  it('acepta respuestas de acceptedAnswers', () => {
    const challenge: Challenge = {
      ...baseChallenge,
      answer: 'Amazon CloudFront',
      acceptedAnswers: ['CloudFront'],
    };
    expect(isCorrectOption('CloudFront', challenge)).toBe(true);
  });
});
