/**
 * .h 头文件, 在此可以定义常量和函数声明
 * 并在其他文件中用 "" 引入(同一目录下)
 */

// 定义常量
#define  A '1'
#define  B '2'
#define  C '3'

// 定义函数签名
void say_hi(void);

int add(int x, int y);

// 也可以函数直接声明定义在头文件, 外部调用

/** foo 函数注释, 可在外部读到 */
void foo(void)
{
  printf("Oh, do you know you can write fn in .h file?\n");
}

/** 
 * bar 函数
 * @param n integer
 */
void bar(int n)
{
  printf("Yeah, you just put %d to this bar func.\n", n);
}