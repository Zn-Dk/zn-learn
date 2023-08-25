#include <stdio.h>

/*
    编写一个程序，提示用户输入以兆位每秒（Mb/s）为单位的下载速度
    和以兆字节（MB）为单位的文件大小。程序中应计算文件的下载时间。
    注意，这里1字节等于8位。使用float类型，并用/作为除号。
    该程序要以下面的格式打印 3 个变量的值（下载速度、文件大小和下载时间），显示小数点后面两位数字：
        At 18.12 megabits per second, a file of 2.20 megabytes
        downloads in 0.97 seconds
 */
int main(void)
{
    const int BIT_TO_BYTE = 8;
    float     speed, size, time;

    printf("Input download speed(Mb/s) and file size(MB): ");
    scanf("%f %f", &speed, &size);

    time = (size * BIT_TO_BYTE) / speed;

    printf("At %.2f megabits per second, a file of %.2f megabytes\n"
           "downloads in %.2f seconds",
           speed, size, time);

    return 0;
}