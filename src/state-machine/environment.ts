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

export const mapEntities = curryN(
  2,
  (
    filterFn: predicate<entity>,
    mapFn: unaryFnUniform<entity>,
    _env: environment
  ): environment => ({
    ...deepClone(_env),
    entities: {
      ..._env.entities,
      ...compose(mapDict(mapFn), filterDict(filterFn))(_env.entities)
    }
  })
);

export const deepClone: unaryFnUniform<environment> = env => ({
  ...env,
  entities: { ...mapDict(entityClone, env.entities) }
});
