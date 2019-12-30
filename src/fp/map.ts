import { curryN } from './curry';
import { reduce } from './reduce';

export const map = curryN(
  1,
  <T>(mapFn: Function, input: T): T => {
    if (Array.isArray(input) && input.length > 1) {
      const [first, ...next] = input;
      return reduce(mapFn, mapFn(first), next);
    }
    return mapFn(input);
  },
);
