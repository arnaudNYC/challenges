const operands = require('../src/operand');

test('should find the operands', () => {
  const arr = [0, 12, 22, 8, 70, 3, 5, 7, 10, 22];
  const sum = 30;
  expect(operands(arr, sum)).toEqual([3, 9]);
  expect(arr[3] + arr[9]).toEqual(sum);
});

test('should not find a sum', () => {
  const arr = [0, 12, 22, 8, 70, 3, 5, 7, 10, 22];
  const sum = 10000;
  expect(operands(arr, sum)).toEqual([-1, -1]);
});