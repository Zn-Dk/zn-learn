#include <stdio.h>


/**
 * 编写一个程序，调用一次 printf()函数，把你的姓名打印在一行。
 * 再调用一次 printf()函数，把你的姓名分别打印在两行。
 * 然后，再调用两次printf()函数，把你的姓名打印在一行。
 * 输出应如下所示<=参考书本 2.1 不放图（当然要把示例的内容换成你的姓名）：
 *
 *
 */
int main(void)
{
  // 这章节还未学到字符串输出 需要使用 * 运算符
  char * first_name = "Gustav";
  char * last_name = "Mahler";

  printf("%s %s\n", first_name, last_name);
  printf("%s\n", first_name);
  printf("%s\n", last_name);
  printf("%s %s\n", first_name, last_name);

  return 0;
}