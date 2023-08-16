#include <stdio.h>

// 编写一个程序把你的年龄转换成天数，并显示这两个值。
// 这里不用考虑闰年的问题


int main(void)
{
  int age = 26;
  int age_in_d = age * 365;

  printf("My age is %d now, convert to days is %d\n", age, age_in_d);

  return 0;
}