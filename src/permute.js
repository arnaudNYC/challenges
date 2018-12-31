/*

Description
Credits: This challenge has appeared in a past google competition.

You are writing out a list of numbers. Your list contains all numbers with
exactly i digits in its decimal representation which are equal to i,
for each i between 1 and 9, inclusive. You are writing them out in ascending order.
For example, you might be writing every number with two '1's and one '5'.
Your list would begin 115, 151, 511, 1015, 1051. Given N, the last number you wrote,
compute what the next number in the list will be. The number of 1s, 2s, ..., 9s is
fixed but the number of 0s is arbitrary.

Input
Your program should read lines of text from standard input.
Each line will contain a single integer n < 10^6.

Output
For each input ingter n, print to standard output the next integer in the list,
one integer per line.

 */

// Heap's algorithm
function* permute(a, n = a.length) {
  if (n <= 1) {
    yield [...a];
  } else {
    for (let i = 0; i < n; i++) {
      yield* permute(a, n - 1);
      const j = n % 2 ? 0 : i;
      [a[n - 1], a[j]] = [a[j], a[n - 1]];
    }
  }
}

const nextPermutation = (currentIntString) => {
  if (currentIntString === 0 || currentIntString >= 999999) {
    return currentIntString;
  }

  return Array.from(permute(`${currentIntString}0`.split('')))
    .map(s => +s.join(''))
    .sort((a, b) => a - b)
    .find(p => p > currentIntString);
};

module.exports = nextPermutation;
