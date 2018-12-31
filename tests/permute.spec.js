const permute = require('../src/permute');

test('permute', () => {
  expect(permute(1)).toEqual(10);
  expect(permute(12)).toEqual(21);
  expect(permute(21)).toEqual(102);
  expect(permute(115)).toEqual(151);
  expect(permute(800)).toEqual(8000);
  expect(permute(6233)).toEqual(6323);
  expect(permute(110005)).toEqual(110050);
  expect(permute(123456)).toEqual(123465);
  expect(permute(123465)).toEqual(123546);
  expect(permute(126543)).toEqual(132456);

  // edge cases
  expect(permute(0)).toEqual(0);
  expect(permute(999999)).toEqual(999999);
});
