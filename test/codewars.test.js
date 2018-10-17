const assert = require('assert');
const { findOdd } = require('../lib/OddInt');

describe('Codewars testing', () => {

  describe('Find Odd Integer tests', () => {
    let tester;

    it('gets 5 from first test', () => {
      tester = [20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5];
      assert.equal(findOdd(tester), 5);
    });

    it('gets negative 1 from second test', () => {
      tester = [1, 1, 2, -2, 5, 2, 4, 4, -1, -2, 5];
      assert.equal(findOdd(tester), -1);
    });

    it('returns only item if array length is one', () => {
      tester = [10];
      assert.equal(findOdd(tester), 10);
    });

  });
});
