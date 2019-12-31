import { curryN } from './curry';
import { reduce } from './reduce';
import { dict } from './commonTypes';

export const map = curryN(1, <T, U>(mapFn: Function, input: T|T[]): U|U[] =>
  Array.isArray(input)
    ? reduce((acc: T[], v: T) => [...acc, mapFn(v)], [], input)
    : mapFn(input)
);

export const mapDict = curryN(
  1,
  <T, U>(mapFn: (arg: T) => U, input: dict<T>): dict<U> =>
    _mapDict(mapFn, {}, Object.keys(input), input)
);

const _mapDict = <T, U>(
  mapFn: (arg: T) => U,
  result: dict<U>,
  keys: string[],
  input: dict<T>
): dict<U> => {
  if (!keys.length) {
    return result;
  }
  const [firstKey, ...nextKeys] = keys;
  return _mapDict(
    mapFn,
    { ...result, [firstKey]: mapFn(input[firstKey]) },
    nextKeys,
    input
  );
};
