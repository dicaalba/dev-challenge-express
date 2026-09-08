import type { Challenge } from '../../types';

/** Banco de retos — Code </> */
export const codeChallenges: Challenge[] = [
  {
    id: 'code-01',
    category: 'code',
    level: 'easy',
    type: 'multiple-choice',
    question: '¿Qué imprime en JavaScript: typeof [] ?',
    options: ["'array'", "'object'", "'list'", "'undefined'"],
    answer: "'object'",
    explanation:
      'En JavaScript los arrays son objetos, por eso typeof [] devuelve "object". Para distinguir un array se usa Array.isArray().',
    keyConcept: 'Tipos en JavaScript',
    timeLimit: 30,
  },
  {
    id: 'code-02',
    category: 'code',
    level: 'easy',
    type: 'true-false',
    question: 'En JavaScript, 0.1 + 0.2 === 0.3 es true.',
    options: ['Verdadero', 'Falso'],
    answer: 'Falso',
    explanation:
      'Por la representación de punto flotante IEEE 754, 0.1 + 0.2 produce 0.30000000000000004.',
    keyConcept: 'Punto flotante',
    timeLimit: 30,
  },
  {
    id: 'code-03',
    category: 'code',
    level: 'medium',
    type: 'debug',
    question: 'Este código imprime siempre 4 en lugar de 1, 2, 3. ¿Por qué?',
    code: `for (var i = 1; i <= 3; i++) {
  setTimeout(() => console.log(i));
}`,
    language: 'javascript',
    answer: 'var no tiene ámbito de bloque; usar let',
    acceptedAnswers: [
      'usar let',
      'usar let en lugar de var',
      'closure con var',
      'let i',
    ],
    explanation:
      'Con var, la variable i es compartida y vale 4 cuando se ejecutan los callbacks. let crea un binding distinto por iteración.',
    keyConcept: 'Closures y scope',
    timeLimit: 30,
  },
  {
    id: 'code-04',
    category: 'code',
    level: 'easy',
    type: 'multiple-choice',
    question: '¿Cuál es la complejidad temporal promedio de buscar una clave en un HashMap?',
    options: ['O(1)', 'O(log n)', 'O(n)', 'O(n²)'],
    answer: 'O(1)',
    explanation:
      'Gracias al hashing, una búsqueda suele ser O(1) en promedio, aunque puede degradarse si hay muchas colisiones.',
    keyConcept: 'Complejidad algorítmica',
    timeLimit: 30,
  },
  {
    id: 'code-05',
    category: 'code',
    level: 'easy',
    type: 'true-false',
    question: 'const en JavaScript hace que un objeto sea completamente inmutable.',
    options: ['Verdadero', 'Falso'],
    answer: 'Falso',
    explanation:
      'const evita reasignar la variable, pero las propiedades del objeto pueden modificarse.',
    keyConcept: 'Inmutabilidad',
    timeLimit: 30,
  },
  {
    id: 'code-06',
    category: 'code',
    level: 'medium',
    type: 'open',
    question: '¿Qué método de Array usarías para transformar cada elemento y obtener un nuevo array?',
    answer: 'map()',
    acceptedAnswers: ['map', '.map', 'Array.prototype.map'],
    explanation:
      'map() devuelve un nuevo array aplicando una función a cada elemento.',
    keyConcept: 'Programación funcional',
    timeLimit: 30,
  },
  {
    id: 'code-07',
    category: 'code',
    level: 'medium',
    type: 'multiple-choice',
    question: '¿Qué diferencia principal hay entre any y unknown en TypeScript?',
    options: [
      'unknown exige validar el tipo antes de usar el valor',
      'any es más seguro que unknown',
      'unknown solo funciona con strings',
      'No existe ninguna diferencia',
    ],
    answer: 'unknown exige validar el tipo antes de usar el valor',
    explanation:
      'Con unknown necesitas hacer narrowing o validación antes de acceder a propiedades o ejecutar operaciones.',
    keyConcept: 'Type safety',
    timeLimit: 30,
  },
  {
    id: 'code-08',
    category: 'code',
    level: 'medium',
    type: 'debug',
    question: '¿Qué está mal en este código?',
    code: `const response = await fetch('/api/users');
console.log(response.length);`,
    language: 'javascript',
    answer: 'response es un Response; falta obtener el body con response.json()',
    acceptedAnswers: [
      'falta response.json()',
      'await response.json()',
      'response no es el array',
      'hay que parsear el body',
    ],
    explanation:
      'fetch devuelve un objeto Response. Antes de acceder a los datos debes leer el body, por ejemplo con await response.json().',
    keyConcept: 'Fetch API',
    timeLimit: 30,
  },
  {
    id: 'code-09',
    category: 'code',
    level: 'medium',
    type: 'multiple-choice',
    question: 'Tu API acaba de crear correctamente un nuevo recurso. ¿Qué status HTTP debería devolver?',
    options: ['200', '201', '204', '404'],
    answer: '201',
    explanation:
      '201 Created indica que la solicitud fue exitosa y produjo la creación de un nuevo recurso.',
    keyConcept: 'HTTP',
    timeLimit: 30,
  },
  {
    id: 'code-10',
    category: 'code',
    level: 'medium',
    type: 'multiple-choice',
    question: '¿Qué método HTTP se espera que sea idempotente?',
    options: ['POST', 'PUT', 'CONNECT', 'PATCH siempre'],
    answer: 'PUT',
    explanation:
      'PUT se define como idempotente: repetir la misma operación debería producir el mismo estado final.',
    keyConcept: 'HTTP Idempotency',
    timeLimit: 30,
  },
  {
    id: 'code-11',
    category: 'code',
    level: 'medium',
    type: 'debug',
    question: '¿Cuál es el orden de salida?',
    code: `console.log('A');

setTimeout(() => console.log('B'), 0);

Promise.resolve().then(() => console.log('C'));

console.log('D');`,
    language: 'javascript',
    answer: 'A, D, C, B',
    acceptedAnswers: ['A D C B', 'A,D,C,B', 'A → D → C → B'],
    explanation:
      'El código síncrono corre primero, luego las microtasks de Promise y finalmente las macrotasks como setTimeout.',
    keyConcept: 'Event Loop',
    timeLimit: 30,
  },
  {
    id: 'code-12',
    category: 'code',
    level: 'medium',
    type: 'multiple-choice',
    question: 'Necesitas ejecutar 5 requests independientes en paralelo. ¿Qué opción es más adecuada?',
    options: [
      'Promise.all()',
      'Cinco await secuenciales',
      'setTimeout()',
      'JSON.stringify()',
    ],
    answer: 'Promise.all()',
    explanation:
      'Promise.all permite iniciar operaciones independientes en paralelo y esperar a que todas terminen.',
    keyConcept: 'Concurrencia',
    timeLimit: 30,
  },
  {
    id: 'code-13',
    category: 'code',
    level: 'medium',
    type: 'true-false',
    question: 'Promise.all() se rechaza si una de las Promises se rechaza.',
    options: ['Verdadero', 'Falso'],
    answer: 'Verdadero',
    explanation:
      'Promise.all utiliza fail-fast: si una Promise se rechaza, la Promise agregada también se rechaza.',
    keyConcept: 'Promises',
    timeLimit: 30,
  },
  {
    id: 'code-14',
    category: 'code',
    level: 'medium',
    type: 'open',
    question: '¿Qué operador usarías para aplicar un valor por defecto solo si el valor es null o undefined?',
    answer: '??',
    acceptedAnswers: ['??', 'nullish coalescing', 'nullish coalescing operator'],
    explanation:
      'El operador ?? usa el valor de la derecha únicamente cuando el de la izquierda es null o undefined.',
    keyConcept: 'Nullish coalescing',
    timeLimit: 30,
  },
  {
    id: 'code-15',
    category: 'code',
    level: 'medium',
    type: 'debug',
    question: '¿Cuál es el problema de seguridad?',
    code: `const query =
  "SELECT * FROM users WHERE email = '" +
  req.body.email +
  "'";`,
    language: 'javascript',
    answer: 'Es vulnerable a SQL Injection',
    acceptedAnswers: [
      'SQL Injection',
      'inyección SQL',
      'usar consultas parametrizadas',
      'usar prepared statements',
    ],
    explanation:
      'Concatenar directamente input del usuario dentro de SQL permite inyección. Deben usarse parámetros o prepared statements.',
    keyConcept: 'SQL Injection',
    timeLimit: 30,
  },
  {
    id: 'code-16',
    category: 'code',
    level: 'medium',
    type: 'open',
    question: '¿Qué utility type de TypeScript hace opcionales todas las propiedades de un tipo?',
    answer: 'Partial<T>',
    acceptedAnswers: ['Partial', 'Partial<T>'],
    explanation:
      'Partial<T> transforma todas las propiedades de T en propiedades opcionales.',
    keyConcept: 'TypeScript Utility Types',
    timeLimit: 30,
  },
  {
    id: 'code-17',
    category: 'code',
    level: 'medium',
    type: 'multiple-choice',
    question: '¿Qué técnica permite cargar código solo cuando el usuario realmente lo necesita?',
    options: [
      'Lazy loading / Code splitting',
      'Polling',
      'Memoization siempre',
      'Server restart',
    ],
    answer: 'Lazy loading / Code splitting',
    explanation:
      'Code splitting divide el bundle y lazy loading permite cargar partes bajo demanda, reduciendo la carga inicial.',
    keyConcept: 'Frontend Performance',
    timeLimit: 30,
  },
  {
    id: 'code-18',
    category: 'code',
    level: 'medium',
    type: 'open',
    question: '¿Qué header HTTP se utiliza comúnmente para controlar el caching de una respuesta?',
    answer: 'Cache-Control',
    acceptedAnswers: ['Cache-Control', 'cache control'],
    explanation:
      'Cache-Control define políticas como max-age, no-cache, no-store o public/private.',
    keyConcept: 'HTTP Caching',
    timeLimit: 30,
  },
  {
    id: 'code-19',
    category: 'code',
    level: 'medium',
    type: 'architecture',
    question:
      'Un cliente reintenta un POST después de un timeout y podrías crear el mismo pago dos veces. ¿Cómo evitarías duplicados?',
    answer: 'Usando una idempotency key',
    acceptedAnswers: [
      'idempotency key',
      'clave de idempotencia',
      'identificador único de operación',
    ],
    explanation:
      'Una clave de idempotencia permite detectar reintentos y devolver el resultado de la operación original sin ejecutarla nuevamente.',
    keyConcept: 'Idempotencia',
    timeLimit: 30,
  },
  {
    id: 'code-20',
    category: 'code',
    level: 'medium',
    type: 'debug',
    question:
      'Una función async devuelve un valor, pero al llamarla recibes Promise { <pending> }. ¿Qué falta probablemente?',
    answer: 'Esperar la Promise con await',
    acceptedAnswers: [
      'await',
      'usar await',
      'resolver la promise',
      'then',
    ],
    explanation:
      'Las funciones async siempre devuelven una Promise. Debes usar await o manejarla con then para obtener el valor resuelto.',
    keyConcept: 'Async/Await',
    timeLimit: 30,
  },
];