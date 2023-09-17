#include <ctype.h>
#include <stdio.h>

int main(void)
{
    int score;
    printf("Enter score(0-100): ");

    if (scanf("%d", &score) != 1) {
        printf("Wrong input");
    }
    else if (score > 100) {
        printf("Out of score range");
    }
    else {
        if (score >= 95)
            printf("A");
        else if (score >= 80)
            printf("B");
        else if (score >= 70)
            printf("C");
        else if (score >= 60)
            printf("D");
        else
            printf("E");
    } 

    return 0;
}