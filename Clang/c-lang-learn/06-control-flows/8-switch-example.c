#include <ctype.h>
#include <stdio.h>

int main(void)
{
    int a_ct, e_ct, i_ct, o_ct, u_ct;
    a_ct = e_ct = i_ct = o_ct = u_ct = 0;

    char ch;
    printf("Enter some text, # to mark end.\n");
    while ((ch = getchar()) != '#') {
        // 统一转成 大写
        switch (toupper(ch)) {
            case 'A':
                a_ct++;
                break;
            case 'E':
                e_ct++;
                break;
            case 'I':
                i_ct++;
                break;
            case 'O':
                o_ct++;
                break;
            case 'U':
                u_ct++;
                break;

            default:
                break;
        }
    }

    printf("number of vowels:   A   E   I   O   U\n");
    printf("                 %4d%4d%4d%4d%4d", a_ct, e_ct, i_ct, o_ct, u_ct);

    /*
        Enter some text, # to mark end.
        The quick brown fox jumps over the lazy dog#

        number of vowels:   A   E   I   O   U
                            1   3   1   4   2
     */
    return 0;
}