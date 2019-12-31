import { curryN } from './curry';
import { reduce } from './reduce';
import { dict, predicate } from './commonTypes';

// Keep when true. "Pick"
export const filter = curryN(1, <T>(predicate: predicate<T>, input: T[]): T[] =>
  reduce((acc: T[], v: T) => (predicate(v) ? [...acc, v] : acc), [], input)
);

export const filterDict = curryN(
  1,
  <T>(predicate: predicate<T>, input: dict<T>): dict<T> =>
    _filterDict(predicate, {}, Object.keys(input), input)
);

const _filterDict = <T>(
  predicate: predicate<T>,
  results: dict<T>,
  keys: string[],
  input: dict<T>
): dict<T> => {
  if (!keys.length) {
    return results;
  }
  const [firstKey, ...nextKeys] = keys;
  if (predicate(input[firstKey])) {
    return _filterDict(
      predicate,
      { ...results, [firstKey]: input[firstKey] },
      nextKeys,
      input
    );
  }
  return results;
};
