#include <stdio.h>
#include <stdlib.h>

int main(int argc, char* argv[])
{
    // 字符串转数字的几种方法
    char* num  = "1234.67";
    char* dist = "500Miles";

    // atoi 字符串转 int (转换 long 还有一个函数是 atol)
    printf("atoi num=\"%s\" -> %d\n", num, atoi(num));
    // atoi num="1234.67" -> 1234
    printf("atoi dist=\"%s\" -> %d\n", dist, atoi(dist));
    // atoi dist="500Miles" -> 500

    // atof 字符串转 float(实际 double)
    printf("atof num=\"%s\" -> %.2lf\n", num, atof(num));
    // atof num="1234.67" -> 1234.67
    printf("atof dist=\"%s\" -> %.2lf\n", dist, atof(dist));
    // atof dist="500Miles" -> 500.00

    // 更安全智能的方法
    char* atom = "10Atom";
    char* end;
    long  val;
    // string to XXX 系列函数
    // strtol strtoll strtoul  /  strtof  strtod strtold
    // 默认的 end 参数用于接收指向该字符串数字结尾处的字符指针(记得是 & 传入)

    // 整数转换还支持 2-36 进制的字符串转数字 strtol, strtoul
    val = strtol(atom, &end, 10);
    printf("\"10Atom\" strtol to radix 10 -> %ld\n", val);
    printf("\tstrtol end at %s(%d)\n", end, *end);
    // "10Atom" strtol to radix 10 -> 10
    //         strtol end at Atom(65)

    val = strtol(atom, &end, 16);
    printf("\"10Atom\" strtol to radix 16 -> %ld(%X)\n", val, val);
    printf("\tstrtol end at %s(%d)\n", end, *end);
    // "10Atom" strtol to radix 16 -> 266(10A)
    //         strtol end at tom(116)

    /** 转换成浮点数 */
    double dbl = strtod("123.34 folks", &end);
    printf("\"123.34 folks\" strtod to double -> %.2lf\n", dbl, dbl);
    printf("\tstrtol end at %s(%d)\n", end, *end);
    // "123.34 folks" strtod to double -> 123.34
    //         strtol end at  folks(32)

    return 0;
}