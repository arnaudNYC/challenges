module.exports = {
  one: {
    *[Symbol.iterator]() {
      for (let i = 1; ; i++) {
        let msg = '';
        if (i % 3 === 0) {
          msg += 'Fizz ';
        }
        if (i % 5 === 0) {
          msg += 'Buzz';
        }
        yield msg.trim() || i;
      }
    }
  },
  two: (length) => Array.from({ length }, (v, i) => {
    let msg = '';
    let n = i + 1;
    if (n % 3 === 0) {
      msg += 'Fizz ';
    }
    if (n % 5 === 0) {
      msg += 'Buzz';
    }
    return msg.trim() || n;
  })
};