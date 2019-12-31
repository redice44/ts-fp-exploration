export type nullaryFn<T> = () => T;
export type unaryFnUniform<T> = (arg1: T) => T;
export type binaryFnUniform<T> = (arg1: T, arg2: T) => T;

export type dict<T> = { [key: string]: T };

export type reducer<T, U> = (accumulator: U, value: T) => U;
export type predicate<T> = (value: T) => boolean;
