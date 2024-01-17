// --------------------- Method 1

export type Days =
  | {
    month: '2';
    days: 28;
  }
  | {
    month: '1' | '3' | '5' | '7' | '8' | '10' | '12';
    days: 31;
  }
  | {
    month: '4' | '6' | '9' | '11';
    days: 30;
  };

export const D: Days = {
  month: '2',
  days: 28,
};

// --------------------- Method 2

type Month = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;

type DaysInMonth = {
  [K in Month]: number;
};

export const daysInMonth: DaysInMonth = {
  1: 31,
  2: 28,
  3: 31,
  4: 30,
  5: 31,
  6: 30,
  7: 31,
  8: 31,
  9: 30,
  10: 31,
  11: 30,
  12: 31,
};

// --------------------- Method 3

export type DaysInMonth2<T extends Month> = T extends 2
  ? 28
  : T extends 1 | 3 | 5 | 7 | 8 | 10 | 12
    ? 31
    : 30;

export const MONTH: Month = 2;
export const MONTH2: Month = 3;

export const DAY: DaysInMonth2<typeof MONTH> = 30;
export const DAY2: DaysInMonth2<typeof MONTH2> = 30;
