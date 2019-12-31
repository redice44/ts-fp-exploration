import { curryN } from './curry';
import { reducer } from './commonTypes';

export const reduce = curryN(
  2,
  <T, U>(reducer: reducer<T, U>, initialValue: U, list: T[]): U =>
    _reduce(reducer, initialValue, list)
);

const _reduce = <T, U>(
  reducer: reducer<T, U>,
  accumulator: U,
  list: T[]
): U => {
  if (!list.length) {
    return accumulator;
  }
  const [v, ...smallerList] = list;
  return _reduce(reducer, reducer(accumulator, v), smallerList);
};
