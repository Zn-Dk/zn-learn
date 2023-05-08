export type Filterable = Record<string, any> | any[];
// 示例
const input = {
  a: 0,
  b: '',
  c: [
    1,
    0,
    false,
    '',
    null,
    undefined,
    {
      d: 0,
      e: '',
      f: [0, 1, '', null],
    },
  ],
};

const isValidValue = (value: unknown) => value === 0 || value === false || !!value;

/**
 * 针对对象进行过滤 滤除嵌套层级内的无效值 (NaN null undefined)
 */
const filterInvalidValues = (obj: Filterable, maxDepth: number = Infinity, currentDepth: number = 0) => {
  const tempObj: any = Array.isArray(obj) ? [] : {};

  Object.entries(obj).reduce((acc, [key, rawValue]) => {
    if (
      currentDepth < maxDepth &&
      (Array.isArray(rawValue) || Object.prototype.toString.call(rawValue).includes('Object'))
    ) {
      const filterRes = filterInvalidValues(rawValue, maxDepth, currentDepth + 1);
      acc[key] = Array.isArray(filterRes) ? filterRes.filter(item => isValidValue(item)) : filterRes;
      return acc;
    }
    if (isValidValue(rawValue)) {
      acc[key] = rawValue;
      return acc;
    }
    return acc;
  }, tempObj);

  return tempObj;
};
const res = filterInvalidValues(input);
console.dir(res);
