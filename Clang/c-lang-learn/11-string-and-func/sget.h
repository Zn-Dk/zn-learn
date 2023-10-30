#include <stdio.h>
#include <string.h>

char* sgets(char* str, int size)
{
    char* ret;
    int   i = 0;
    ret     = fgets(str, size, stdin);
    if (ret)  // ret != NULL
    {
        while (*ret != '\n' && *ret != '\0')
            ret++;
        if (*ret == '\n')
            *ret = '\0';
        else
            while (getchar() != '\n')
                continue;
    }

    return ret;
}

char* s_gets(char* str, int size)
{
    char *ret, *return_ptr;
    ret = fgets(str, size, stdin);
    if (ret) {
        // 通过 strchr 判断, 清除换行符
        return_ptr = strchr(str, '\n');
        if (return_ptr)
            *return_ptr = '\0';
        else
            while (getchar() != '\n')
                continue;
    }

    return ret;
}