import { reduce } from './';

export const compose = (...fns: Function[]) => (arg: unknown) => {
  const [firstFn, ...toReduceFns] = fns.slice().reverse();
  return reduce(composeReducer, firstFn(arg), toReduceFns);
};

const composeReducer = (arg: any, fn: Function): any => fn(arg);
