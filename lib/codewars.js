function pigIt(str){
  const split = str.split(' ');
  let res = split.map(word => {
    if(word[0] === '?' || word[0] === '!') return word;
    let end = word[0] + 'ay';
    return word.slice(1) + end;
  });
  return res.join(' ');
}

function findOdd(arr) {
  if(arr.length === 1) return arr[0];
  let dict = {};
  for(let i of arr) {
    if(dict[i]) dict[i] += 1;
    else dict[i] = 1;
  }
  let final = arr.filter(num => dict[num] % 2 === 1);
  return final[0];
}

function spinWords(str){
  return str.split(' ').map(word => {
    return (word.length >= 5) ? word.split('').reverse().join('') : word;
  }).join(' ');
}

function smallEnough(arr, limit){
  return (arr.length === arr.filter(num => num <= limit).length) ? true : false;
}

function findOutlier(arr){
  const even = arr.filter(num => num % 2 === 0);
  const odd = arr.filter(num => num % 2 !== 0);
  return even.length === 1 ? even[0] : odd[0];
}

const dutyFree = (normPrice, discount, hol) => Math.floor(hol / (normPrice * (discount / 100)));

let fact = [1];
while(fact.length <= 25) fact.push(fact.length * fact[fact.length - 1]);

function listPosition(word, counter = 1) {
  if(word.length === 1) return counter;

  const letters = word.split('').sort();
  
  const dict = letters.reduce(((a, c) => {
    a[c] ? a[c]++ : a[c] = 1;
    return a;
  }), {});

  const duplicates = Object.values(dict).reduce(((a, c) => {
    return a * fact[c];
  }), 1);
  
  counter += letters.indexOf(word[0]) * fact[word.length - 1] / duplicates;
  
  return listPosition(word.slice(1), counter);
}

function songDecoder(str){
  return str.split('WUB').filter(char => char !== '').join(' ');
}

function lowestProduct(input) { 
  if(input.length < 4) return 'Number is too small';
  let lowest;
  for(let i = 3; i < input.length; i++) {
    const val = input[i] * input[i - 1] * input[i - 2] * input[i - 3];
    if(lowest > val || !lowest) lowest = val;
    if(lowest === 0) return 0;
  }
  return lowest;
}

function cleanString(str) {
  return str.split('').reduce((acc, cur) => {
    cur === '#' ? acc.pop() : acc.push(cur);
    return acc;
  }, []).join('');
}

const anagrams = (word, words) => words.filter(_word => _word.split('').sort().join('') === word.split('').sort().join(''));

function sumStrings(a, b) { 

  const cleaner = str => {
    if(str[0] == '0') {
      str = str.slice(1);
      cleaner(str);
    }
    return str;
  };

  a = cleaner(a);
  b = cleaner(b);

  let res = '', carry = 0, _a, _b, temp, digitSum;
  if(b.length > a.length) {
    temp = b;
    b = a;
    a = temp;
  }
  for(let i = 0; i < a.length; i++) {
    _a = parseInt(a[a.length - 1 - i]);
    _b = parseInt(b[b.length - 1 - i]) ? parseInt(b[b.length - 1 - i]) : 0;
    temp = (carry + _a + _b).toString();
    digitSum = temp[temp.length - 1];
    carry = parseInt(temp.substr(0, temp.length - 1)) ? parseInt(temp.substr(0, temp.length - 1)) : 0;
    res = (i === a.length - 1) ? temp + res : digitSum + res;
  }
  return res;
}

function formatDuration(seconds) {
  let minutes, hours, days, years, res = '';
  
  if(seconds == 0) return 'now';
  if(seconds / 86400 / 365 >= 1) {
    years = Math.floor(seconds / 86400 / 365);
    seconds -= years * 86400 * 365;
    res += years === 1 ? '1 year' : `${years} years`;
  }
  if(seconds / 86400 >= 1) {
    days = Math.floor(seconds / 86400);
    seconds -= days * 86400;
    if(res !== '') res += ', ';
    res += days === 1 ? '1 day' : `${days} days`;
  }
  if(seconds / 3600 >= 1) {
    hours = Math.floor(seconds / 3600);
    seconds -= hours * 3600;
    if(res !== '') res += ', ';
    res += hours === 1 ? '1 hour' : `${hours} hours`;
  }
  if(seconds / 60 > 1) {
    minutes = Math.floor(seconds / 60);
    seconds -= minutes * 60;
    if(res !== '') res += seconds ? ', ' : ' and ';
    res += minutes === 1 ? '1 minute' : `${minutes} minutes`;
  }
  if(seconds) {
    if(res !== '') res += ' and ';
    res += seconds === 1 ? '1 second' : `${seconds} seconds`;
  }
  return res;
}

function persistence(num, times = 0) {
  let splitNum = num.toString().split('');
  if(splitNum.length === 1) return times;
  times++;
  let newNum = splitNum.reduce((acc, cur) => parseFloat(cur) * acc, 1);
  return persistence(newNum, times);
}

const sumMix = x => x.reduce((acc, cur) => acc + parseInt(cur), 0);

const uniqueInOrder = iterable => {
  let result = [];
  for(let i in iterable) {
    if(iterable[i - 1] !== iterable[i]) {
      result.push(iterable[i]);
    }
  }
  return result;
};

module.exports = {
  sumMix,
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
  sumStrings,
  formatDuration,
  persistence,
  uniqueInOrder
};


