const map = <T extends any>(fn: (item: T) => any) => {
  return (x: T[]) => x.map(item => fn(item));
};

const lowerCase = (x: string) => x.toLowerCase();
const upperCase = (x: string) => x.toUpperCase();
const head = (x: string) => x[0];
const join = (sep = '') => (x: string[]) => x.join(sep);
const split = (sep = '') => (x: string) => x.split(sep);

// pipe 逻辑
const pipe = <T>(...composers: ((arg: any) => any)[]) => {
  return (initVal: T) => {
    // 正常的compose应该是 reduceRight
    return composers.reduce((acc, composer) => composer(acc), initVal);
  };
};

const compose = <T>(...composers: ((arg: any) => any)[]) => {
  return (initVal: T) => {
    // 正常的compose应该是 reduceRight
    // 我这里实现了是 pipe 逻辑
    return composers.reduceRight((acc, composer) => composer(acc), initVal);
  };
};

const str = 'hello world compose';

const pipeFn1 = pipe(
  split(' '),
  map(pipe(upperCase, head)),
  join('. '),
);
console.log(pipeFn1(str));

const compFn1 = compose(
  join('. '),
  map(compose(upperCase, head)),
  split(' '),
);
console.log(compFn1(str));
