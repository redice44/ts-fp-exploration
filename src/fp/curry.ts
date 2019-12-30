export const curryN = (n: number, fn: Function): Function =>
  (arg1: unknown) => 
    _curryN(n - 1, fn, [arg1]);

const _curryN = (n: number, fn: Function, args: any[]): Function =>
  (arg: any) => 
    n === args.length - 1
      ? fn(...args, arg)
      : _curryN(n - 1, fn, [...args, arg]);
