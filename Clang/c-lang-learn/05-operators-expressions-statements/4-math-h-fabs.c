#include <math.h>
#include <stdio.h>
int main(void)
{
    const double PI = 3.1415926;
    double       user_pi;

    printf("What is PI value in your opinion: ");
    scanf("%lf", &user_pi);
    // fabs 比较浮点数 math.h, 返回绝对值
    while (fabs(user_pi - PI) > 0.0001) {  // 绝对值大于目标精度时, 继续让用户输入
        printf("Try again! more precisely\n");
        scanf("%lf", &user_pi);
    }

    // 用户输入达到精度要求 结束, 打印
    printf("Right, PI is about %.8f, your inputs: %lf", PI, user_pi);

    /*
      What is PI value in your opinion: 3.14
      Try again! more precisely
      3.1415
      Right, PI is about 3.14159260, your inputs: 3.141500
    */
    return 0;
}