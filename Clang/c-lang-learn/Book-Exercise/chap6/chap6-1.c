#include <stdio.h>

/*
  编写一个程序，创建一个包含26个元素的数组，并在其中储存26个小
  写字母。然后打印数组的所有内容。
 */

#define ALPHABET_NUM 26

int main(void)
{
    char alphabet[ALPHABET_NUM];
    char ch = 'a';
    int  i;

    for (i = 0; i < ALPHABET_NUM; i++) {
        alphabet[i] = ch + i;
        printf("%c", alphabet[i]);
    }

    return 0;
}