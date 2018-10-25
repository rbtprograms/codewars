
// part 1 everyting to create tokens
function Token(type, value) {
  this.type = type;
  this.value = value;
}

function isDigit(ch) {
  return /\d/.test(ch);
}

function isOperator(ch) {
  return /\+|-|\*|\//.test(ch);
}

function isLeftParen(ch) {
  return (ch === '(');
}

function isRightParen(ch) {
  return (ch === ')');
}

function tokenize(str) {
  let result = [];
  let numberBuffer = [];

  str.replace(/\s+/g, '');
  str = str.split('');
  
  function emptyNumberBufferAsLiteral() {
    if(numberBuffer.length) {
      result.push(new Token('Literal', numberBuffer.join('')));
      numberBuffer = [];
    }
  }

  str.forEach(char => {
    if(isDigit(char)) numberBuffer.push(char);
    else if(char === '.') numberBuffer.push(char);
    else if(isOperator(char)) {
      emptyNumberBufferAsLiteral();
      result.push(new Token('Operator', char));
    }
    else if(isLeftParen(char)) {
      if(numberBuffer.length) {
        emptyNumberBufferAsLiteral();
        result.push(new Token('Operator', '*'));
      }
      result.push(new Token('Left Paren', char));
    }
    else if(isRightParen(char)) {
      emptyNumberBufferAsLiteral();
      result.push(new Token('Right Paren', char));
    }
  });
  if(numberBuffer.length) {
    emptyNumberBufferAsLiteral();
  }
  
  return result;
}

//part 2 everything to parse
function parse(expression) {
  let expr;

  
}

module.exports = {
  tokenize
};



