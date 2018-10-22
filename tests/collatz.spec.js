const collatz = require('../src/collatz');

describe('collatz sequence', () => {
  it('should iterate from 12', () => {
    const start = 12;
    const sequence = collatz(start);
    let result = [start];
    for (let n of sequence) {
      result = [...result, n];
    }
    expect(result).toEqual([12, 6, 3, 10, 5, 16, 8, 4, 2, 1]);
  });
  it('should iterate from 19', () => {
    const sequence = collatz(19);
    const terms = [19, ...sequence];
    expect(terms).toEqual([19, 58, 29, 88, 44, 22, 11, 34, 17, 52, 26, 13, 40,
      20, 10, 5, 16, 8, 4, 2, 1]);
  });

  describe('when it starts with 27', () => {
    const sequence = collatz(27);
    const terms = [27].concat(Array.from(sequence));

    it('should have 9232 as the highest term', () => {
      const max = Math.max.apply(null, terms);
      expect(max).toBe(9232);
    });
    it('should start with 27', () => {
      expect(terms[0]).toBe(27);
    });
    it('should end with 1', () => {
      expect(terms[terms.length - 1]).toBe(1);
    });
  });
});
