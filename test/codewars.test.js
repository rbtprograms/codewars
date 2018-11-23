const assert = require('assert');
const { 
  findOdd, 
  spinWords,
  smallEnough,
  findOutlier,
  dutyFree,
  listPosition,
  songDecoder,
  pigIt,
  lowestProduct,
  cleanString,
  anagrams,
  sumStrings } = require('../lib/codewars');
const { 
  tokenize,
  parser,
  calc
} = require('../lib/token');
const {
  lex,
  parse,
  calculate
} = require('../lib/examp');
  
describe('Codewars testing', () => {
  let tester;

  describe.only('sum strings', () => {
    it('can pass a test', () => {
      assert.equal(sumStrings('123', '456'), '579');
    });
  });

  describe('anagrams function', () => {
    it('can pass the tests', () => {
      assert.deepEqual(anagrams('abba', ['aabb', 'abcd', 'bbaa', 'dada']), ['aabb', 'bbaa']);
      assert.deepEqual(anagrams('racer', ['crazer', 'carer', 'racar', 'caers', 'racer']), ['carer', 'racer']);
      assert.deepEqual(anagrams('laser', ['lazing', 'lazy',  'lacer']), []);
    });
  });

  describe('clean string kata', () => {
    it('can pass all the tests', () => {
      assert.equal(cleanString('abc#d##c'), 'ac');
      assert.equal(cleanString('abc####d##c#'), '');
    });
  });

  describe('lowest product of 4 digits', () => {
    it('can pass the tests', () => {
      assert.equal(lowestProduct('123456789'), 24); 
      assert.equal(lowestProduct('234567899'), 120); 
      assert.equal(lowestProduct('2345611117899'), 1);
      assert.equal(lowestProduct('333'), 'Number is too small');
      assert.equal(lowestProduct('1234111'), 4, 'Numbers should be consecutives');        
      assert.equal(lowestProduct('9041922734'), 0);        
    });
  });
    
  describe('expression interpreter', () => {
    it('can tokenize things effectively', () => {
      const tokens = tokenize('2 + 3 - 4.5 * (5+2)');
      assert.equal(tokens[0].type, 'number');
      assert.equal(tokens[0].value, '2');
      assert.equal(tokens[tokens.length - 1].type, '(end)');
      assert.deepEqual(tokenize('2+1'), lex('2+1'));
    });

    it('can parse things effectively', () => {
      const expression = '2+1*(5+4)';
      assert.deepEqual(parser(tokenize(expression)), parse(lex(expression)));
    });


    it('has my refactored function that can pass the required tests', () => {
      assert.equal(calc('2+1'), 3);
      assert.equal(calc('2*3'), 6);
      assert.equal(calc('8/2'), 4);
      assert.equal(calc('5 +-2'), 3);
      assert.equal(calc('5 * (6-4)'), 10);
    });

    it('has an example function that can pass the required tests', () => {
      assert.equal(calculate('2+1'), 3);
      assert.equal(calculate('2*3'), 6);
      assert.equal(calculate('8/2'), 4);
      assert.equal(calculate('5 +-2'), 3);
      assert.equal(calculate('5 * (6-4)'), 10);
    });
  });


  describe('pigIt tests', () => {
    it('should pass the tests', () => {
      assert.equal(pigIt('Pig latin is cool'), 'igPay atinlay siay oolcay');
      assert.equal(pigIt('This is my string'), 'hisTay siay ymay tringsay');
    });
  });

  describe('song decoder tests', () => {
    it('should pass the tests', () => {
      assert.equal(songDecoder('AWUBBWUBC'), 'A B C', 'WUB should be replaced by 1 space');
      assert.equal(songDecoder('AWUBWUBWUBBWUBWUBWUBC'), 'A B C', 'multiples WUB should be replaced by only 1 space');
      assert.equal(songDecoder('WUBAWUBBWUBCWUB'), 'A B C', 'heading or trailing spaces should be removed');

    });
  });

  describe('listPosition tests', () => {
    it('should pass the tests', () => {
      assert.equal(listPosition('ABAB'), 2);
      assert.equal(listPosition('BOOKKEEPER'), 10743);
      assert.equal(listPosition('QUESTION'), 24572);
    });
  });


  describe('dutyFree tests', () => {
    it('should find how much I am saving by buying duty free', () => {
      assert.equal(dutyFree(12, 50, 1000), 166);
      assert.equal(dutyFree(17, 10, 500), 294);
      assert.equal(dutyFree(24, 35, 3000), 357);
    });
  });

  describe('find outliers tests', () => {

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
