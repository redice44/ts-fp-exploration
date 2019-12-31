import { curryN, dict, mapDict, unaryFnUniform } from '../fp';
import { deepClone as entityClone, entity, move as moveEntity } from './entity';

type environment = {
  location: string;
  entities: dict<entity>;
};

export const move = curryN(
  1,
  (moveFn: unaryFnUniform<entity>, _env: environment): environment => ({
    ...deepClone(_env),
    entities: { ...mapDict(moveFn, _env.entities) }
  })
);

export const deepClone: unaryFnUniform<environment> = env => ({
  ...env,
  entities: { ...mapDict(entityClone, env.entities) }
});
