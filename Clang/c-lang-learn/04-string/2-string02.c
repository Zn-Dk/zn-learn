#include <stdio.h>

// strlen 的依赖原型
#include <string.h>

int main(void)
{
    char sentence[40] = "Nice to meet you";

    // sizeof 返回定义的实际大小, strlen 读取实际字符长度(非空字符)
    printf(
        "The sentence has sizeof %d, and the length is %u\n",  // strlen 返回的类型实际是 %u / %uld
        sizeof(sentence), strlen(sentence));
    // The sentence has sizeof 40, and the length is 16

    printf("There is a way to "
           "print a long string.");  // 长文本可通过连续的 "" "" 字符串链接

    return 0;
}