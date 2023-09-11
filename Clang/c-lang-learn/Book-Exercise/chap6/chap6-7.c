#include <stdio.h>
#include <string.h>
/*
  编写一个程序把一个单词读入一个字符数组中，然后倒序打印这个单词。提示：strlen()函数
 */
int main(void)
{
    char word[40];
    printf("Enter a word and I'll print it out reversed: \n");
    scanf("%s", word);

    for (int i = strlen(word) - 1; i >= 0; i--) {
        printf("%c", word[i]);
    }
    printf("\nDone!");

    return 0;
}