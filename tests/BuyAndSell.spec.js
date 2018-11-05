const { naive, optimal } = require('../src/BuyAndSell');

test('it should return 5', () => {
  const prices = [7, 1, 5, 3, 6, 4];
  const expected = 5;
  assert(prices, expected);
});

test('it should return 0', () => {
  const prices = [7, 6, 4, 3, 1];
  const expected = 0;
  assert(prices, expected);
});

const assert = (prices, expected) => {
  expect(naive(prices)).toEqual(expected);
  expect(optimal(prices)).toEqual(expected);
};
