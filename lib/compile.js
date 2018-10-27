const multiply = (...operands) => operands.reduce((acc, cur) => acc * cur, 1);
const subtract = (...operands) => operands.reduce((acc, cur) => acc - cur);
const add = (...operands) => operands.reduce((acc, cur) => acc + cur, 0);
const divide = (...operands) => operands.reduce((acc, cur) => acc / cur);

const lex = str => str.split(' ').map(s => s.trim()).filter(s => s.length);

const Op = Symbol('op');
const Num = Symbol('num');

const parse = tokens => {
  let c = 0;

  const peek = () => tokens[c];
  const consume = () => tokens[c++];

  const parseNum = () => ({ val: parseInt(consume()), type: Num });

  const parseOp = () => {
    const node = { val: consume(), type: Op, expr: [] };
    while(peek()) node.expr.push(parseExpr());
    return node;
  };

  const parseExpr = () => /\d/.test(peek()) ? parseNum() : parseOp();

  return parseExpr();
};

const transpile = ast => {
  const opMap = { add: '+', multiply: '*', subtract: '-', divide: '/' };
  const transpileNode = ast => ast.type === Num ? transpileNum(ast) : transpileOp(ast);
  const transpileNum = ast => ast.val;
  const transpileOp = ast => `(${ast.exper.map(transpileNode).join(' ' + opMap[ast.val] + ' ')})`;
  return transpileNode(ast);
};

