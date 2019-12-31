import {
  compose,
  curryN,
  dict,
  filterDict,
  mapDict,
  predicate,
  unaryFnUniform
} from '../fp';
import { deepClone as entityClone, entity, move as moveEntity } from './entity';

type environment = {
  location: string;
  entities: dict<entity>;
};

export const move = curryN(
  2,
  (
    moveFn: unaryFnUniform<entity>,
    filterFn: predicate<entity>,
    _env: environment
  ): environment => ({
    ...deepClone(_env),
    entities: {
      ..._env.entities,
      ...compose(mapDict(moveFn), filterDict(filterFn))(_env.entities)
    }
  })
);

export const deepClone: unaryFnUniform<environment> = env => ({
  ...env,
  entities: { ...mapDict(entityClone, env.entities) }
});
