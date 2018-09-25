module.exports = (arr, match) => {
  const sortedArray = [...arr].sort((a, b) => a - b);
  let begin = 0;
  let end = sortedArray.length - 1;
  let sum = sortedArray[begin] + sortedArray[end];

  while (begin < end) {
    if (sum < match) {
      begin += 1;
    } else if (sum > match) {
      end -= 1;
    } else {
      return [arr.indexOf(sortedArray[begin]), arr.lastIndexOf(sortedArray[end])];
    }
    sum = sortedArray[begin] + sortedArray[end];
  }
  return [-1, -1];
};