const fizzbuzz = require('../src/fizzbuzz');

describe('fizzbuzz', () => {
  const expected = [
    1, 2, 'Fizz', 4, 'Buzz', 'Fizz', 7, 8, 'Fizz', 'Buzz', 11, 'Fizz', 13, 14,
    'Fizz Buzz', 16, 17, 'Fizz', 19, 'Buzz', 'Fizz', 22, 23, 'Fizz', 'Buzz', 26,
    'Fizz', 28, 29, 'Fizz Buzz', 31, 32, 'Fizz', 34, 'Buzz', 'Fizz'
  ];

  it('first 36 terms', () => {
    const terms = [];
    for (let n of fizzbuzz.one) {
      if (terms.length === 36) {
        break;
      }
      terms.push(n);
    }
    expect(terms).toEqual(expected);
  });
  it('first 36 terms', () => {
    expect(fizzbuzz.two(36)).toEqual(expected);
  });
});
