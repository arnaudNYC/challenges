const cumulativeTriangle = require('../src/cumulativeTriangle');

test('it should equal 65 when the row is 5', () => {
  expect(cumulativeTriangle(5)).toEqual(65);
});

test('it should equal 500050 when the row is 100', () => {
  expect(cumulativeTriangle(100)).toEqual(500050);
});


