module.exports = (arr, sum) => {
  const s = [];
  const result = arr.reduce((acc, n) => {
    let temp = sum - n;
    if (temp >= 0 && s.includes(temp)) {
      acc.push([n, temp].sort((a, b) => a - b));
    }
    s.push(n);
    return acc;
  }, []);

  if (result.length === 0) {
    return [-1, -1];
  }
  return result;
};
