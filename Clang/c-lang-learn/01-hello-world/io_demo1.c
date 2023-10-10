#include <stdio.h>

int add(int a, int b) {
  return a + b;
}

int main(void)
{
  int dogs;
  printf("How many dogs do you have? \n");
  // %d 数字占位符
  scanf("%d", &dogs);
  printf("I know, so you have %d dogs! \n", dogs);

  int sum;
  int x;
  int y;
  printf("input two numbers to sum up, press enter to input each \n");
  scanf("%d", &x);
  scanf("%d", &y);

  sum = add(x, y);
  printf("%d + %d equals %d", x, y, sum);

  return 0;
}


// Example:
// How many dogs do you have?
// 20
// I know, so you have 20 dogs!
// input two numbers to sum up, press enter to input each
// 1
// 5
// 1 + 5 equals 6