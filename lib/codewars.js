//[20, 1, -1, 2, -2, 3, 3, 5, 5, 1, 2, 4, 20, 4, -1, -2, 5]

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


module.exports = {
  findOdd,
  spinWords,
  smallEnough,
  findOutlier,
  dutyFree,
  listPosition
};
