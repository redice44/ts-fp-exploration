import { compose, curryN, reduce } from './fp';
import { binaryFnUniform } from './fp/internalTypes';
import * as sm from './state-machine';

const arrConcat: binaryFnUniform<any[]> = (x, y) => [...x, ...y];
const concat: binaryFnUniform<string> = (x, y) => x + y;
const sum: binaryFnUniform<number> = (x, y) => x + y;
const product: binaryFnUniform<number> = (x, y) => x * y;

console.log(reduce(arrConcat, [], [[1, 2, 3], ['a', 'b', 'c']]));
console.log(reduce(concat, '', ['hello', ' ', 'world']));
console.log(reduce(sum, 0, [1, 2, 3]));
console.log(reduce(product, 1, [2, 3, 4]));

const add = curryN(1, sum);
const multiply = curryN(1, product);
const inc = add(1);
console.log(add(1)(2))
console.log(inc(4));

const complexCalculations = compose(
  multiply(2),
  add(1),
  multiply(3),
  add(2),
  add(3)
);
console.log(complexCalculations(0));
console.log(complexCalculations(1));

const position = {
  x: 0,
  y: 0,
};

console.log(sm.moveUp(position));
console.log(sm.moveDown(position));
console.log(sm.moveLeft(position));
console.log(sm.moveRight(position));

const up2right1 = compose(sm.moveUp, sm.moveUp, sm.moveRight);
console.log(compose(up2right1, up2right1, up2right1)(position));
