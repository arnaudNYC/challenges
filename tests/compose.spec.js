const compose = require('../src/compose');

test('it should compose a list of functions', () => {
  const composed = compose(
    n => n + 1,
    n => n * 0.5,
    n => n * n
  );
  expect(composed(1)).toEqual(1.5);
  expect(composed(2)).toEqual(3);
  expect(composed(100)).toEqual(5001);
});