#include <stdio.h>

#define SIZE 3

void show(const int ar[], int n) {
  for (int i = 0; i < n; i++)
    printf("%d ", ar[i]);

  putchar('\n');
}

void show2(int row, int col, const int ar[row][col]) {
  for (int i = 0; i < row; i++) {
    for (int j = 0; j < col; j++)
      printf("%d ", ar[i][j]);
    putchar('\n');
  }
  putchar('\n');
}

int main(void) {
  // 字面量常数, 直接声明字面量数组传递给数组参数的函数
  // 格式   带长度参数: (int[SIZE]) {1,2,3,4}   |   动态: (int[]) {1,2,3,4}

  show((int[SIZE]){1, 2, 3}, SIZE);
  show((int[]){8, 3, 9, 2}, 4);

  // 二维数组的使用
  show2(2, 3, (int[2][3]){1, 2, 3, 4, 5, 6}); // 允许
  show2(2, 3, (int[][3]){1, 2, 3, 4, 5, 6});  // 允许

  // show2(2, 3, (int[][]){1,2,3,4,5,6}); // 错误

  // n 维数组, 同函数形参, 只能省略第一维长度
  // show_n(2, (int[][3][4]){1,2,3,4,5,6});


  // 声明指针形式的复合数组字面量
  float *ptr;

  ptr = (float[]){1.2f, 2.4f};

  printf("%.3f", *(ptr + 1));


  return 0;
}