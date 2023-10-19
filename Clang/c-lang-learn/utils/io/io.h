#include <stdio.h>

void flush_buffer()
{
    while (getchar() != '\n')
        break;
}
