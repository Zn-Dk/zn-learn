#include <stdio.h>

#define ROW 3
#define COL 4

// 根据逗号运算符从左往右的顺序, 这种写法是错误的
// int sum2d(int arr[row][col], int row, int col)

// row col 形参先写, 然后再将数组传入
int sum2d(int row, int col, int arr[row][col])
{
  int sum = 0;

  for(int i = 0; i < row; i++)
    for(int j = 0; j < col; j++)
      sum += arr[i][j];

  return sum;
}

int main(void)
{
  int arr[ROW][COL] = {
    {1, 2, 3, 4},
    {1, 2, 3, 4},
    {1, 2, 3, 4}
  };

  int arr2[ROW - 1][COL + 2] = {
    {3, 4, 9, 7, 8, 3},
    {2, 6, 2, 5, 8, 9}
  };

  printf("Sum of arr is %d\n", sum2d(ROW, COL, arr));
  printf("Sum of arr2 is %d\n", sum2d(ROW - 1, COL + 2, arr2));

  return 0;
}