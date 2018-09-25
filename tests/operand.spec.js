const operands = require('../src/operand');

describe('when using the optimal solution', () => {
  it('should find the operands', () => {
    const arr = [15, 5, 7, 13];
    const sum = 20;
    expect(operands(arr, sum)).toEqual([[5, 15], [7, 13]]);
  });
  it('should find the operands', () => {
    const arr = [0, 12, 22, 8, 70, 3, 5, 7, 10, 22];
    const sum = 30;
    expect(operands(arr, sum)).toEqual([[8, 22], [8, 22]]);
  });
  it('should not find a sum', () => {
    const arr = [0, 12, 22, 8, 70, 3, 5, 7, 10, 22];
    const sum = 10000;
    expect(operands(arr, sum)).toEqual([-1, -1]);
  });
});
