import { curryN } from './curry';

type reducer<T, S> = (a: S, v: T) => S;

export const reduce = curryN(
  2,
  <T, S>(reducer: reducer<T, S>, initialValue: S, list: T[]): S =>
    _reduce(reducer, initialValue, list)
);

const _reduce = <T, S>(
  reducer: reducer<T, S>,
  accumulator: S,
  list: T[]
): S => {
  if (!list.length) {
    return accumulator;
  }
  const [v, ...smallerList] = list;
  return _reduce(reducer, reducer(accumulator, v), smallerList);
};
