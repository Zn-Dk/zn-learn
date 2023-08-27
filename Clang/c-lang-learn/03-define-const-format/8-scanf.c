#include <stdio.h>

int main(void)
{
    int   age;
    float salary;
    char  food[30];

    printf("Enter your age, salary, and favorite food. \n");
    // Enter your age, salary, and favorite food.

    scanf("%d %f %s", &age, &salary, food);  // 读取为基本类型使用&, 读取字符数组不使用
    // 18 12345.23 Pizza

    printf("Your age %d, salary $%.2f, favorite food is %s\n", age, salary, food);
    // Your age 18, salary $12345.23, favorite food is Pizza

    /* scanf 与格式字符串组合 */

    int x, y;
    printf("input a point in 2-D space, separated by comma, like x,y\n");
    scanf("%d,%d", &x, &y);
    // 15,20 <- 按这种格式输入(带空格可以接受, 只要符合两边是整数类型)
    printf("pt(%d, %d)\n", x, y);
    // pt(15, 20)

    char c;
    scanf("%c", &c);         // 这个会读取空字符
    printf("char %c\n", c);  // 直接打印 char 空
    scanf(" %c", &c);        // 这个则从第一个非空字符读取
    printf("char %c\n", c);

    return 0;
}