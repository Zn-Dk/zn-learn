#include "sget.h"
#include <stdio.h>

#define MSG_SIZE 50
#define SIZE 20

int main(void)
{
    char   message[MSG_SIZE];
    char   fname[SIZE];
    char   lname[SIZE];
    double salary;

    printf("First Name: ");
    sgets(fname, SIZE);

    printf("Last Name: ");
    sgets(lname, SIZE);

    printf("Salary: ");
    scanf("%lf", &salary);
    putchar('\n');

    sprintf(message, "[INFO] %s %s, Salary: $%.2lf", fname, lname, salary);
    puts(message);
    /*
    First Name: John
    Last Name: Doe
    Salary: 12000.50

    [INFO] John Doe, Salary: $12000.50
     */
    return 0;
}