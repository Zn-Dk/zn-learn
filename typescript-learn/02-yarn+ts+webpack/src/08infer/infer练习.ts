type InferFirst<T extends unknown[]> = T extends [infer P, ...infer _]
  ? P
  : never;
type a1 = InferFirst<[1, 3, 4, 5]>;

type InferLast<T extends unknown[]> = T extends [...infer _, infer P]
  ? P
  : never;
type a2 = InferLast<[1, 3, 4, 5]>;

type Shift<T> = T extends [infer L, ...infer R] ? [...R] : [];

type a3 = Shift<[1, 2, 3, 4, 5]>;

type isNum<T> = T extends number | number[] ? true : false;
type IntersectionTypeConfict = { id: number; name: 2 } & {
  age: number;
  name: number;
};

interface Person {
  name: string;
  age?: number | undefined;
  [propName: string]: string | number | undefined;
}

interface LabeledValue {
  label: string;
}
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}
let myObj = { size: 10, label: "Size 10 Object" };
printLabel(myObj); // OK

let o = { a: 1, b: "2" };

type A = typeof o;
type AA = "A" | "B" | "C";
type B = Record<AA, A>;

function foo<T, E, O>(arg1: T, arg2: E, arg3?: O, ...args: T[]): void {}
