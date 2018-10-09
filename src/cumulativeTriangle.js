module.exports = (n) => {
  let sum = 0;
  let row = n;
  let last = 0;

  while (row > 0) {
    last += row;
    row -= 1;
  }

  for (let i = last - n + 1; i <= last; i++) {
    sum += i;
  }
  return sum;
};
