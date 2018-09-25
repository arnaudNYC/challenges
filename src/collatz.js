module.exports = (previous = 1) => {
  return {
    [Symbol.iterator]: function* () {
      while (previous > 1) {
        if (previous % 2 === 0) {
          previous = previous / 2;
          yield previous;
        } else {
          previous = (previous * 3) + 1;
          yield previous;
        }
      }
    }
  };
};
