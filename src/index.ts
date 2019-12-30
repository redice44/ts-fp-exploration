import { curryN, reduce } from './fp';

type arrBinaryFn = (arg1: any[], arg2: any[]) => any[];
type numberBinaryFn = (arg1: number, arg2: number) => number;
type stringBinaryFn = (arg1: string, arg2: string) => string;

const arrConcat: arrBinaryFn = (x, y) => [...x, ...y];
const concat: stringBinaryFn = (x, y) => x + y;
const sum: numberBinaryFn = (x, y) => x + y;

console.log(reduce(arrConcat, [], [[1, 2, 3], ['a', 'b', 'c']]));
console.log(reduce(concat, '', ['hello', ' ', 'world']));
console.log(reduce(sum, 0, [1, 2, 3]));

const add = curryN(1, sum);
const inc = add(1);
console.log(add(1)(2))
console.log(inc(4));
