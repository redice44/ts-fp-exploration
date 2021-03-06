import * as util from 'util';
import { binaryFnUniform , compose, curryN, filter, map, reduce, predicate, unaryFnUniform } from './fp';
import { mapEntities } from './state-machine/environment';
import { entity, move as moveEntity } from './state-machine/entity';
import {
  moveUp as up,
  moveDown as down,
  moveRight as right,
  moveLeft as left,
} from './state-machine/move';

const fpToys = () => {
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
};

const envToy = () => {
  const startingPosition = {
    x: 0,
    y: 0,
  };

  const entity1: entity = {
    name: 'foo',
    position: startingPosition,
    state: 'alive',
  };

  const entity2: entity = {
    name: 'bar',
    position: startingPosition,
    state: 'dead',
  };

  const env = {
    location: 'world',
    entities: {
      foo: entity1,
      bar: entity1,
      baz: entity2,
    },
  };

  const moveUp4 = moveEntity(compose(up, up, up, up));
  const moveUpRight = moveEntity(compose(up, right));

  const anyEntities: predicate<entity> = e => true;
  const isAlive: predicate<entity> = e => e.state === 'alive';
  const isDead: predicate<entity> = e => !isAlive(e);
  const killAll: unaryFnUniform<entity> = e => ({ ...e, state: 'dead' });
  const sendHome: unaryFnUniform<entity> = e => ({ ...e, position: { ...startingPosition } });

  const all = mapEntities(anyEntities);
  const alive = mapEntities(isAlive);
  const dead = mapEntities(isDead);

  showDeepNests(
    compose(
      alive(killAll),
      dead(sendHome),
      alive(moveUp4),
      all(moveUpRight),
    )(env)
  );
};

const showDeepNests = (v: Object) => {
  console.log(util.inspect(v, false, null));
};

envToy();
