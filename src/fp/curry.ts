export const curryN = (requiredArguments: number, fn: Function): Function =>
  (...args: any[]) =>
    requiredArguments < args.length
      ? fn(...args)
      : _curryN(requiredArguments, fn, [...args]);

const _curryN = (requiredArguments: number, fn: Function, args: any[]): Function =>
  (...calledArgs: any[]) =>
    requiredArguments < args.length + calledArgs.length
      ? fn(...args, ...calledArgs)
      : _curryN(requiredArguments, fn, [...args, ...calledArgs]);
