import { curryN, map, unaryFnUniform } from '../fp';
import { direction, position } from './move';

type state = 'alive' | 'dead';
export type entity = {
  name: string;
  position: position;
  state: state;
};

export const move = curryN(
  1,
  (moveFn: unaryFnUniform<position>, _entity: entity): entity => ({
    ...deepClone(_entity),
    position: map(moveFn, _entity.position)
  })
);

export const deepClone: unaryFnUniform<entity> = entity => ({
  ...entity,
  position: { ...entity.position }
});
