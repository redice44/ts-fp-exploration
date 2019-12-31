import { binaryFnUniform , compose, curryN, reduce } from './fp';
import { move } from './state-machine/environment';
import { entity, move as moveEntity } from './state-machine/entity';
import {
  moveUp as up,
  moveDown as down,
  moveRight as right,
  moveLeft as left,
} from './state-machine/move';

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

const startingPosition = {
  x: 0,
  y: 0,
};

const entity1: entity = {
  name: 'foo',
  position: startingPosition,
  state: 'alive',
};

const env = {
  location: 'world',
  entities: {
    foo: entity1,
    bar: entity1,
  },
};

console.log(moveEntity(up, entity1));
const moveEntityUp4 = compose(
  moveEntity(up),
  moveEntity(up),
  moveEntity(up),
  moveEntity(up),
);

// This hotness right here is why you want to write in the FP paradigm
const upRight = compose(up, right);

console.log(moveEntity(upRight)(entity1));

console.log(JSON.stringify(move(moveEntityUp4, env), null, 2));
