double power_fl(double n, int p)
{
    double result = 1;
    for(int i = 0; i < p; i++) {
        result *= n;
    }
    return result;
}

unsigned long power_int(int n, int p)
{
    unsigned long sums = 1;
    for (int i = 0; i < p; i++) {
        sums *= n;
    }
    return sums;
}