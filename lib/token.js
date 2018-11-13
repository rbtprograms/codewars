const tokenize = input => {

  const isOperator = char => /[+\-*/^%=(),]/.test(char);
  const isDigit = char => /[0-9]/.test(char);

  let tokens = [];

  const addToken = (type, value) => {
    tokens.push({
      type: type,
      value: value
    });
  };

  for(let i = 0; i < input.length;) {
    if(input[i] === ' ') i++;
    else if(isOperator(input[i])) {
      addToken(input[i]);
      i++;
    }
    else if(isDigit(input[i])) {
      let num = input[i];
      i++;
      while(isDigit(input[i]) || input[i] === '.') {
        num += input[i];
        i++;
        if(input[i] === '.') {
          num += input[i];
          i++; 
          while(isDigit(input[i])) num += input[i];
        }
      }
      num = parseFloat(num);
      addToken('number', num);
    }
  }
  
  addToken('(end)');
  return tokens;
};

const parser = tokens => {
  const symbols = {};

  const symbol = (id, nud, lbp, led) => {
    let sym = symbols[id] || {};
    symbols[id] = {
      lbp: sym.lbp || lbp,
      nud: sym.nud || nud,
      led: sym.lef || led
    };
  };

  const interpretToken = token => {
    let sym = Object.create(symbols[token.type]);
    sym.type = token.type;
    sym.value = token.value;
    return sym;
  };

  let i = 0;
  const token = () => interpretToken(tokens[i]);
  const advance = () => { 
    i++; 
    return token();
  };

  const expression = rbp => {
    let left, t = token();
    advance();
    if(!t.nud) throw 'Unexpected token: ' + t.type;
    left = t.nud(t);
    while(rbp < token().lbp) {
      t = token();
      advance();
      if(!t.led) throw 'Unexpected token: ' + t.type;
      left = t.led(left);
    }
    return left;
  };

  const infix = (id, lbp, rbp, led) => {
    rbp = rbp || lbp;
    symbol(id, null, lbp, led || function(left) {
      return {
        type: id,
        left: left,
        right: expression(rbp)
      };
    });
  };
  const prefix = (id, rbp) => {
    symbol(id, () => {
      return {
        type: id,
        right: expression(rbp)
      };
    });
  };

  symbol(')');
  symbol('(end)');
  symbol('number', (number) => {
    return number;
  });
  symbol('(', () => {
    let value = expression(2);
    if(token().type !== ')') throw 'Expected closing parenthesis \')\'';
    advance();
    return value;
  });

  prefix('-', 5);
  infix('*', 4);
  infix('/', 4);
  infix('+', 3);
  infix('-', 3);

  let parseTree = [];
  while(token().type !== '(end)') {
    parseTree.push(expression(0));
  }
  return parseTree;
};

const solve = parseTree => {

  const operators = {
    '+': (a, b) => a + b,
    '-': (a, b) => {
      if(typeof b === 'undefined') return -a;
      return a - b;
    },
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
  };

  const parseNode = node => {
    if(node.type === 'number') return node.value;
    else if(operators[node.type]) {
      if(node.left) return operators[node.type](parseNode(node.left), parseNode(node.right));
      return operators[node.type](parseNode(node.right));
    }
    else if(node.type === 'identifier') {
      const value = node.value;
      if(typeof value === 'undefined') throw node.value + ' is undefined';
      return value;
    }
  };

  let output = '';
  for(let i = 0; i < parseTree.length; i++) {
    const value = parseNode(parseTree[i]);
    if(typeof value !== 'undefined') output += value;
  }
  return parseFloat(output);
};


const calc = str => solve(parser(tokenize(str)));

// console.log('***HELLO***', calc('2*7+(3)'));

module.exports = {
  tokenize,
  parser,
  solve,
  calc
};
