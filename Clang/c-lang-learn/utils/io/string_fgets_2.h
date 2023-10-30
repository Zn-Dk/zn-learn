#include <stdio.h>
#include <string.h>

char* sgets(char* str, int size)
{
    char* ret;
    int   i = 0;
    ret     = fgets(str, size, stdin);
    if (ret)  // ret != NULL
    {
        while (ret[i] != '\n' && ret[i] != '\0')
            i++;
        if (ret[i] == '\n')
            ret[i] = '\0';
        else
            while (getchar() != '\n')
                continue;
    }

    return ret;
}

char* s_gets(char* str, int size)
{
    char *ret, *has_return;
    ret = fgets(str, size, stdin);
    if (ret) {
        // 通过 strchr 清除换行符
        has_return = strchr(str, '\n');
        if (has_return)
            *has_return = '\0';
        else
            while (getchar() != '\n')
                continue;
    }

    return ret;
}