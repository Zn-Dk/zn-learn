#include <stdio.h>

/*
  考虑下面两个无限序列：
    1.0 + 1.0/2.0 + 1.0/3.0 + 1.0/4.0 + ...
    1.0 - 1.0/2.0 + 1.0/3.0 - 1.0/4.0 + ...
  编写一个程序计算这两个无限序列的总和，直到到达某次数。提示：奇
  数个-1 相乘得-1，偶数个-1相乘得1。让用户交互地输入指定的次数，当用
  户输入0或负值时结束输入。查看运行100项、1000项、10000项后的总和，
  是否发现每个序列都收敛于某值？
*/
void get_sum(int count);

int main(void)
{
    int count;
    do {
        printf("\nEnter calc times (<=0 to exit): ");
        scanf("%d", &count);
        get_sum(count);
    } while (count > 0);

    return 0;
}

// 序列1
void get_sum(int count)
{
    float sum1, sum2, cur;
    float sign = 1.0f;
    for (int i = 1; i <= count; i++) {
        cur = 1.0f / (float)(i * 1.0);
        sum1 += cur;
        sum2 += sign * cur;
        // 切换符号
        sign = -sign;
    }
    printf("Sum 1: %lf\n", sum1);
    printf("Sum 2: %lf\n", sum2);
}

/*
    Enter calc times (<=0 to exit): 10
    Sum 1: 2.928968
    Sum 2: 0.645635

    Enter calc times (<=0 to exit): 100
    Sum 1: 5.187378
    Sum 2: 0.688172

    Enter calc times (<=0 to exit): 1000
    Sum 1: 7.485478
    Sum 2: 0.692646

    Enter calc times (<=0 to exit): 10000
    Sum 1: 9.787613
    Sum 2: 0.693092

    Enter calc times (<=0 to exit): 100000
    Sum 1: 12.090851
    Sum 2: 0.693134

    第二序列向 0.7 收拢, 第一个在小数数量级看不出收拢(不过很大的值比如 1000000000 -> 结果是 16 左右)

 */