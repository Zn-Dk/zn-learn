#include <stdio.h>

char* sgets(char* str, int size)
{
    char* pt;
    int   i = 0;
    pt      = fgets(str, size, stdin);
    if (pt)  // pt != NULL
    {
        while (pt[i] != '\n' && pt[i] != '\0')
            i++;
        if (pt[i] == '\n')
            pt[i] == '\0';
        else
            while (getchar() != '\n')
                continue;
    }

    return pt;
}
