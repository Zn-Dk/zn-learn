#include <stdio.h>

/*
编写一个程序，创建一个整型变量toes，并将toes设置为10。程序中还
要计算toes的两倍和toes的平方。该程序应打印3个值，并分别描述以示区
分。

 */

int main(void)
{
  int toes = 10;
  int toes_square = toes * toes;
  int toes_cube = toes_square * toes;

  printf("toes = %d, toes_square = %d, toes_cube = %d\n", toes, toes_square, toes_cube);

  return 0;
}