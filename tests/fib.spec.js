const { fib, fibGen } = require('../src/fib');

const expected = [2, 8, 34, 144, 610];

test('the even terms of the fibonacci sequence less than or equal to 1000', () => {
  const actual = fib(1000);
  expect(actual).toEqual(expected);
});

test('the even terms of the fibonacci sequence less than or equal to 1000', () => {
  const actual = [...fibGen(1000)];
  expect(actual).toEqual(expected);
});