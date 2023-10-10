#include <stdio.h>

// 一般主入口函数通常应该返回 0 表示应用程序正常输出
// 故定义 int main 而非 void main()
int main(void)
{
  printf("hello world");

  // 如果希望在 windows 系统运行程序不自动退出, 最后加上这一行
  getchar();

  return 0;
};
