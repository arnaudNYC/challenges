/*
 * Print all the terms of the fibonacci sequence inferior or equal to the max parameter
 */

export const fib = max => {
  let result = [];
  let previous = 0;
  let current = 1;
  while (current <= max) {
    if (current % 2 === 0) {
      result.push(current);
    }
    [previous, current] = [current, current + previous];
  }
  return result;
};

// When transpiled to ES5, this code will run very poorly
export const fibGen = max => ({
  [Symbol.iterator]: function* () {
    let previous = 0;
    let current = 1;
    while (current <= max) {
      if (current % 2 === 0) {
        yield current;
      }
      [previous, current] = [current, current + previous];
    }
  }
});