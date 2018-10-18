const assert = require('assert');
const { 
  findOdd, 
  spinWords,
  smallEnough,
  findOutlier } = require('../lib/codewars');

describe('Codewars testing', () => {
  let tester;

  describe.only('find outliers tests', () => {

    it('be able to get even numbers, and should treat 0 as even', () => {
      assert.equal(findOutlier([1, 2, 3]), 2);
      assert.equal(findOutlier([1, 1, 0, 1, 1]), 0);
    });

    it('should also work for finding odds', () => {
      assert.equal(findOutlier([2, 6, 8, 10, 3]), 3);
      assert.equal(findOutlier([0, 0, 3, 0, 0]), 3);
      assert.equal(findOutlier([0, 1, 2]), 1);
    });

    it('should work on first item in array', () => {
      assert.equal(findOutlier([3, 6, 8, 10, 2]), 3);
    });
  });

  describe('Find Odd Integer tests', () => {

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

  describe('spinwords testing', () => {
    it('reverses strings of 5 or more length', () => {
      tester = 'Hey fellow warriors';
      assert.deepEqual(spinWords(tester), 'Hey wollef sroirraw');
    });
  });

  describe('array limit', () => {
    it('returns true if all items are smaller than limit', () => {
      assert.equal(smallEnough([66, 101], 200), true);
      assert.equal(smallEnough([101, 45, 75, 105, 99, 107], 107), true);
      assert.equal(smallEnough([80, 117, 115, 104, 45, 85, 112, 115], 120), true);
    });
    
    it('returns false if any items are larger than limit', () => {
      assert.equal(smallEnough([78, 117, 110, 99, 104, 117, 107, 115], 100), false);
      assert.equal(smallEnough([101, 45, 75, 105, 99, 107], 50), false);
    });
  });
});
