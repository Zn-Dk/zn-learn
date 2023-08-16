#include <stdio.h>

int main(void)
{
    // 使用 8/16进制

    // 8 进制以 0 开头
    int oct_a = 010;  // 十进制数8
    int oct_b = 020;  // 十进制数16

    // 16 进制以 0x 和 0X 开头
    int hex_a = 0x10;
    int hex_b = 0X20;

    // 打印 8/16 进制数
    // 十进制显示数字，使用%d；
    // 以八进制显示数字，使用%o；
    // 以十六进制显示数字，使用%x
    // 另外，要显示各进制数的前缀0、0x和0X，必须分别使用%#o、%#x、%#X。
    printf("DEC: oct_a=%d, oct_b=%d, hex_a=%d, hex_b=%d\n", oct_a, oct_b, hex_a, hex_b);
    printf("OCT: oct_a=%o, oct_b=%o, hex_a=%o, hex_b=%o\n", oct_a, oct_b, hex_a, hex_b);
    printf("HEX: oct_a=%x, oct_b=%x, hex_a=%x, hex_b=%x\n", oct_a, oct_b, hex_a, hex_b);
    printf("WITH PREFIX: oct_a=%#o, hex_a=%#x, hex_b=%#X", oct_a, hex_a, hex_b);
    /*
        DEC: oct_a=8, oct_b=16, hex_a=16, hex_b=32
        OCT: oct_a=10, oct_b=20, hex_a=20, hex_b=40
        HEX: oct_a=8, oct_b=10, hex_a=10, hex_b=20
        WITH PREFIX: oct_a=010, hex_a=0x10, hex_b=0X20
     */
    return 0;
}
