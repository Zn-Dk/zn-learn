void print_str_arr(int row, int col, char (*arr)[col])
{
    for (int r = 0; r < row; r++)
        puts(*arr++);

    putchar('\n');
}
