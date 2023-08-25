#include <stdio.h>

#include <string.h>
/*
  编写一个程序，提示用户输入名，并执行一下操作：
    a.打印名，包括双引号；
    b.在宽度为20的字段右端打印名，包括双引号；
    c.在宽度为20的字段左端打印名，包括双引号；
    d.在比姓名宽度宽3的字段中打印名。
 */
int main(void)
{
    char first_n[20];
    printf("Tell me your first name\n");
    scanf("%s", first_n);

    printf("\"%s\" \n", first_n);
    printf("\"%20s\" \n", first_n);
    printf("\"%-20s\" \n", first_n);
    printf("\"%*s\" \n", strlen(first_n) + 3, first_n);

    return 0;
}