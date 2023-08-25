#include <stdio.h>
#include <string.h>

/*
    编写一个程序，先提示用户输入名，然后提示用户输入姓。
    在一行打印用户输入的名和姓，下一行分别打印名和姓的字母数。
    字母数要与相应名和姓的结尾对齐，如下所示：
    Melissa Honeybee
          7        8
    接下来，再打印相同的信息，但是字母个数与相应名和姓的开头对齐，如下所示：
    Melissa Honeybee
    7       8
 */
int main(void)
{
    char          f_name[20], l_name[20];
    unsigned long f_len, l_len;
    printf("Enter your first name then last name: ");
    scanf("%s %s", f_name, l_name);

    f_len = strlen(f_name);
    l_len = strlen(l_name);

    /** MARK 这里注意考查 strlen 的返回类型 ** unsigned long */
    printf("%s %s \n", f_name, l_name);
    printf("%*lu %*lu \n", f_len, f_len, l_len, l_len);
    printf("%-*lu %-*lu \n", f_len, f_len, l_len, l_len);

    return 0;
}