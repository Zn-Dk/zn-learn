# C 语言学习笔记 By Zn

## C 语言数据类型关键字

### 表示整型的

- int
- long
- short
- unsigned

  - 提供基本整数型的变式 如, unsigned short int 代表非负整数.

- signed(C90)
  - 整数型默认范围的关键字 表面范围为正负整数。

### 表示浮点(小数)

- float
- double

### 表示字符 

- char 字符类型 (也可表达为较小的整数)

### 表示其他

- void (C90)

- \_Bool (C99) 布尔值

  > 可以使用 stdbool.h 文件兼容 C++ 的 bool

- \_Complex (C99) 复数

- \_Imaginary (C99) 虚数

> 以上通过关键字创建的类型, 如按计算机的储存方式
> 可分为两大基本类型: 整数类型和浮点数类型

### 浮点数与 E 科学计数

1. 基本的科学计数格式为:

`1.23`(小数部分)`E8`(指数部分)

E 代表 10 的倍数, 上面这个数就是 1.23\*10^8, 所以,

```text
3.16E7 -> 3.16 * 10^7
7.0 -> 0.7E1
```

这种数在计算机里被视为浮点数，而计算机是用**二进制和 2 的幂**进行储存的，而不是 10 的幂。

整型和浮点型的实际区别:

- 整数没有小数部分，浮点数有小数部分。

- 浮点数可以表示的范围比整数大。

- 对于一些算术运算（如，两个很大的数相减），浮点数损失的精度更多。

  > 因为在任何区间内（如，1.0 到 2.0 之间）都存在无穷多个实数，所以 计算机的浮点数不能表示区间内所有的值。浮点数通常只是实际值的近似值。例如，7.0 可能被储存为浮点值 6.99999。

- 浮点运算比整数运算慢。不过，现在许多 CPU 都包含浮点处理器，缩小了速度上的差距。

  > 故很多时候 CPU 的算力衡量中经常有多少 TFlops 的术语,就来源于此.

## C 语言基本数据类型

### int

- 范围: -32768~32767 (由 ISO C 规定, 这是 16 位存储的范围)

- 声明: 单独声明 或 同时声明(逗号分隔)

- 赋值:

  - 直接赋值
  - scanf() 等函数取值

- 打印的**转换说明**字符 `%d`

  > 打印的时候有少写了参数会怎么样?

  > ```c
  > int main(void)
  > {
  >     int ten = 10;
  >     int two = 2;
  >     printf("Doing it right: ");
  >     printf("%d minus %d is %d\n", ten, 2, ten - two);
  >     printf("Doing it wrong: ");
  >     printf("%d minus %d is %d\n", ten); // 遗漏2个参数
  >     return 0;
  > }
  > ```

  > 编译并运行该程序，输出如下：
  > Doing it right: 10 minus 2 is 8
  > Doing it wrong: 10 minus 16 is 1650287143
  >
  > 在第一行输出中，第 1 个%d 对应 int 类型变量 ten；第 2 个%d 对应 int 类型常量 2；第 3 个%d 对应 int 类型表达式 ten - two 的值。
  >
  > 在第二行输出中，第 1 个%d 对应 ten 的值，但是由于没有给后两个%d 提供任何值，所以打印出的值是**内存中的任意值**（因为内存中储存的数据不同，而且编译器管理内存的位置也不同,不同情况都不一样）。

#### 使用 8/16 进制

- 8 进制以 0 开头

  ```c
   int oct_a = 010;  // 十进制数8
   int oct_b = 020;  // 十进制数16
  ```

- 16 进制以 0x 和 0X 开头

  ```c
   int hex_a = 0x10;
   int hex_b = 0X20;
  ```

- 打印

- 十进制显示数字，使用 `%d`；
- 以八进制显示数字，使用 `%o`；
- 以十六进制显示数字，使用 `%x`；
- 另外，要显示各进制数的前缀 0、0x 和 0X，必须分别使用`%#o`、`%#x`、`%#X`。

```c
 printf("DEC: oct_a=%d, oct_b=%d, hex_a=%d, hex_b=%d\n", oct_a, oct_b, hex_a, hex_b);
    printf("OCT: oct_a=%o, oct_b=%o, hex_a=%o, hex_b=%o\n", oct_a, oct_b, hex_a, hex_b);
    printf("HEX: oct_a=%x, oct_b=%x, hex_a=%x, hex_b=%x\n", oct_a, oct_b, hex_a, hex_b);
    printf("WITH PREFIX: oct_a=%#o, hex_a=%#x, hex_b=%#X", oct_a, hex_a, hex_b);

/*
        DEC: oct_a=8, oct_b=16, hex_a=16, hex_b=32
        OCT: oct_a=10, oct_b=20, hex_a=20, hex_b=40
        HEX: oct_a=8, oct_b=10, hex_a=10, hex_b=20
        WITH PREFIX: oct_a=010, hex_a=0x10, hex_b=0X20
*/

```

#### int 修饰符

> C 语言提供 3 个附属关键字修饰基本整数类型：short、long 和 unsigned。

- `short int`类型（或者简写为`short`） 

  占用的存储空间可能比 int 类型少，常用于较小数值的场合以节省空间。

  与 int 类似，short 是有符号类型, **存储 16 位数字**。现代语言称之为 `int16`

  > unsigned short i;　 i 可以表示 0~65535
  >
  > signed（默认）short i;　 i 可以表示-32768~+32767

  > 含 2 个字节
  >
  > - signed 取值范围为：-2^15 ~ 2^15 - 1
  >
  > - unsigned 为 2^16 - 1

- `long int`或`long`

  占用的存储空间可能比 int 多，适用于较大数值的场合, 有符号的最大值大概 21亿。

  与 int 类似，**存储 32 位数字**, long 是有符号类型。 现代语言称之为 `int32`

  **在现代系统中, int 的范围通常与 long 相同。**

  > 含 4 个字节
  >
  > - signed 取值范围为：-2^31 ~ (2^31 -1),
  > - unsigned 为 (2^32 - 1)

  > 打印转换说明 `%ld` `%lu`

  > - 如果系统中 int 和 long 的大小相同，使用%d 就行。但是，这样的程序被移植到其他系统（int 和 long 类型的大小不同,老机器）中会无法正常工作。

- `long long int`或`long long`（C99 标准加入）

  占用的储存空间可能比 long 多，适用于更大数值的场合。

  该类型**至少占 64 位**。与 int 类似，long long 是有符号类型。现代语言称之为 `int64`

  > 含 8 个字节，取值范围为：-2^63 ~ (2^63 -1), unsigned 为 2^64 -1

  > 打印转换说明 `%lld` `%llu`

- `unsigned int`或`unsigned` **无符号整型**

  只用于**非负值**的场合, 默认整型是 `signed`, 即有符号整型, 因此 `unsigned` **可表示的正整数比对应的有符号整型大**。

  例如，16 位 unsigned int 允许的取值范围是 0 ～ 65535，而不是-32768 ～ 32767。用于表示正负号的位现在用于表示另一个二进制位，所以无符号整型可以表示更大的数。

  > 打印转换说明 `%lu`

- 在 C90 标准中，添加了`unsigned long int`(`unsigned long`)和

  `unsigned int`或 `unsigned short`类型。

  > 打印转换说明 `%lu`

- C99 标准又添加了`unsigned long long int`(`unsigned long long`)。

  > 打印转换说明 `%llu`

- 在任何有符号类型前面添加关键字`signed`，可强调使用有符号类型的意图。例如，short、short int、signed short、signed short int**都表示同一种类型**。

### char

> char 类型实际上储存的是整数而不是字符。计算机使用数字编码来处理字符，即用特定的整数表示特定的字符。

- 范围: ASCII -> Unicode ...etc.

- 声明: 单独声明 或 同时声明(逗号分隔)

- 赋值:

  - 字符常量 **`使用单引号` **

    - `my_char = 'A'` 只能容纳一个字符

  - 赋值为十进制整数 ACSII 对应的数字 如 `char grade = 65(A)` , 但不是好规范

  - 转义序列 '\n' '\t' 等

    - 转义序列可以使用八进制 \0oo o 为(0~7) 或者十六进制 \xhh h 为(0~f)

      > 注意 **八进制转义可以省略 0**, 即能写出 **&#39;\007&#39; &#39;\07&#39; &#39;\7&#39;** 而这三种都表示相同的值, 比如 &#39;\41&#39; -&gt; 33(10) -&gt; !

- 打印:

  - **转换说明** `%c`

  - 可以被打印成 `%d`

    > printf 中转换声明只是打印的一种转换形式,
    >
    > 而非数据存储的形式

    ```c
    int main(void)
    {
        char ch;
    
        printf("Enter a character: ");
        // & 表示将用户输入的值赋值给 ch
        scanf("%c", &ch);
        // 使用 %d 可以将 char 的 ascii 码输出
        printf("ch = %c, code is %d", ch, ch);
        // Enter a character: %
        // ch = %, code is 37
    
        return 0;
    }
    ```

### \_Bool 布尔

> C99 标准添加了*Bool 类型，用于表示布尔值，即逻辑值 true 和 false。*
>
> 因为 C 语言用值 1 表示 true，值 0 表示 false，所以\_Bool 类型实际上也是一种整数类型。
>
> 但原则上它仅占用**1 位存储空间**，因为对 0 和 1 而言，1 位的存储空间足够了。

```c
// 声明 布尔值
_Bool bol = 0; // 赋值使用 0 | 1

// 打印使用 %d
printf("%d\n", bol);
// 0

if (!bol)
{
    printf("bol is false\n");
    // bol is false
}
```

```c
/* 大小比较 */

  _Bool bol = 0;
  int  num = 0;

  printf("sizeof bol: %d Byte\n", sizeof(bol));
  printf("sizeof num: %d Byte\n", sizeof(num));
  // sizeof bol: 1 Byte
  // sizeof num: 4 Byte
```

- C99 提供 `stdbool.h` 头文件, 让 bool 成为 _Bool 的别名, 并把 true = 1, false = 0, **这样写出来的代码可以与 C++ 兼容**

### 浮点数

浮点数类型包含

`float` `double` and `long double`

#### float

- 转换声明 `%f`

> C 标准规定，float 类型必须**至少能表示 6 位有效数字**，且取值范围至少是 `10^-37～10^+37`。前一项规定指 float 类型必须至少精确表示小数点后的 6 位有效数字，如 33.333333。后一项规定用于方便地表示诸如太阳质量（2.0e30 千克）、一个质子的电荷量（1.6e-19 库仑）或国家债务之类的数字。通常， 系统储存一个浮点数要占用 32 位。其中 8 位用于表示指数的值和符号，剩下 24 位用于表示非指数部分（也叫作尾数或有效数）及其符号。

#### double

- 转换声明 `%lf` <- 在读取变量时是必须的, 打印的时候非必须

> 取值范围与 `float` 相同 , 但是至少必须能表示 10 位有效数字。一般情况 下，double 占用 64 位而不是 32 位。一些系统将多出的 32 位全部用来表示非指数部分，这不仅增加了有效数字的位数（即提高了精度），而且还减少了舍入误差。另一些系统把其中的一些位分配给指数部分，以容纳更大的指数，从而增加了可表示数的范围。无论哪种方法，double 类型的值**至少有 13 位有效数字**，超过了标准的最低位数规定。

#### long double

> C 语言的第 3 种浮点类型是 long double，以满足比 double 类型更高的精度 要求。不过，C 只保证 long double 类型至少与 double 类型的精度相同。

---

- 范围: 10^-37 ～ 10^+37 有效数字不定 6 / 13 /+

- 声明: 单独声明 或 同时声明(逗号分隔)

- 赋值:

  - 浮点型常量

    ```c
    3.1415
    .123
    1.23e-5
    -4.5E+10
    100.
    ```

  - 注意事项:

    > 默认声明的浮点常量为 `double` 类型 \*\*

    1. 使用 `f/F` 覆盖默认设置, 确保浮点常量为 `float`

    ```c
    float some = 4.0 * 2.0
       // 4.0 2.0 默认会使用 double 进行运算, 这可能造成性能问题
    
    ---
    /* fix */
    float some_float = 4.0f * 2.0f;
    ```

           	2. 使用使用 `l/L` 覆盖默认设置, 确保浮点常量为

  `long double` 类型(推荐 L 以免小写 l 与数字 1 混淆)

- 十六进制(不常用)

  > 使用 p/P 代替 e/E , 用 2 的幂代替 10 的幂

  `0xa.1fp10`

  - 0xa -> 十进制 10

  - .1f -> (第一位小数 1)1/16 + (第二位小数 f)15/256

  - p10 -> 2 ^ 10 -> 1024

  最终这个值为 (10 + 1/16 + 15/256) \* 1024 = 10364.0

- 打印

  - **转换说明** 
    - `%f` float
    - `%lf` double (读取的时候必须声明 l 字母)
  - 打印指数计数法的浮点数 `%e`
  - 位数控制: % 符号 + .(有效数字位数) + 标记 如两位有效数字 float `%.2f`

- 精度的 example 说明

  ```c
  	float  f1 = 1.23456789012345;  // float 仅支持 6 位有效数字
      double d1 = 1.23456789012345;
  
      // 1. float 与 double 都使用 %f 打印
      // 2. %f 默认打印 6 为有效数字, 这也是 float 的最小有效数字要求
  
      printf("%f\n", f1);
      // 1.234568
  
      // 3.可以看到 float 在超过 6 位有效数字后 精确度变得不好保证, 故超过 6 位的小数应使用 double 保存
  
      printf("%.7f\n", f1);
      // 1.2345679
      printf("%.8f\n", f1);
      // 1.23456788            <= 丢失精度
      printf("%.9f\n", f1);
      // 1.234567881           <= 丢失精度
      printf("%.10f\n", f1);
      // 1.2345678806          <= 丢失精度
  
      printf("%.10f\n", d1);
      // 1.2345678901          <= double 精度依然保证
      printf("%.14f\n", d1);
      // 1.23456789012345      <= double 精度依然保证
  ```

### 复数和虚数类型

> 一般而言，虚数类型都是可选项。C11 标准把整个复数软件包都作为可选项。

简而言之，C 语言有 3 种复数类型：`float_Complex`、`double_Complex`和 `long double_Complex`。

例如，`float_Complex` 类型的变量应包含两个 float 类型的值，分别表示复数的实部和虚部。

类似地， C 语言的 3 种虚数类型是`float__Imaginary`、`double_Imaginary` 和`long double_Imaginary`。

如果包含`complex.h`头文件，便可用`complex`代替 `_Complex`，用 `imaginary` 代替 `_Imaginary`，还可以用 `I` 代替-1 的平方根。

> 小结：基本数据类型由 11 个关键字组成：int、long、short、unsigned、char、 float、double、signed、`_Bool`、`_Complex`和 `_Imaginary`。

### 命名规范

> 许多程序员和公司内部都有系统化的命名约定，在变量名中体现其类型。
>
> 例如，用 `i_` 前缀表示 int 类型，`us_`前缀表示 unsigned short 类型。
>
> 这样， 一眼就能看出来 i_smart 是 int 类型的变量， us_versmart 是 unsigned short 类型 的变量。

## 常量,预处理器和格式化输入输出

### #define

C 语言可以使用 #define 声明符号常量, 通过 C 预处理器进行编译时替换

- 格式 `#define NAME value`

- 末尾不需要加分号
- 常量推荐全大写

Example:

```c
#include <stdio.h>

/** 定义常量格式 #define NAME value */
#define WORD "Hello"

/* 常量定义不需要分号结尾 */
#define PI 3.1415926

/* 高阶 使用常量定义函数 */
#define AREA(r) (PI * r * r)

int main(void)
{
    int r;
    printf("%s\n", WORD);
    // Hello
    printf("circle radius? ");
    // circle radius? 5
    scanf("%d", &r);

    printf("PI is using %.7f\n", PI);
    // PI is using 3.1415926
    printf("circle area = %.7f\n", AREA(r));
    // circle area = 78.5398150

    return 0;
}
```

### const

```c
#include <stdio.h>

int main(void)
{
    // 使用 const 关键字声明不可变的常量变量
    const int NO_CHANGE = 100;

    NO_CHANGE = 200;  // error: assignment of read-only variable 'NO_CHANGE'

    printf("%d", NO_CHANGE);

    return 0;
}
```

### 明示常量

- C 头文件 limits.h 和 float.h 分别提供了与整数类型和浮点类型大小限制相
  关的详细信息。
- 可参考电子书 P79

![image-20230821130915983](assets\image-20230821130915983.png)

![image-20230821131014338](assets\image-20230821131014338.png)

### printf 的原则

- 如果内部的转换声明对应的表达式不符合, 输出是不确定的, 如果都是数字类型, 可能出现类型转换,

  如果是完全不同的类型, 可能会导致不输出

- 返回 int 类型, 即 printf 的原表达式实参包含有多少个字符或者说这个表达式的字符串长度 (转义符, 空格也被计入)

  ```c
  // Example: 
  printf("%d", printf("a: %d\n", 11));
  // a: 11
  // 6 <- 等同于 strlen("a: %d\n")
  ```

  

### printf 格式化演示

- 数字格式化

```c
#include <stdio.h>

int main(void)
{
    int NUM = 1234;

    printf("*%d*\n", NUM);
    // *1234*

    /** 1. %数字d 表示字符宽度. 如果超出了宽度, 则使用更宽字段 */
    printf("*%4d*\n", NUM);
    // *1234*
    printf("*%4d*\n", 12345678);
    // *12345678*

    // 2. 使用 - 代表数字位于字段的左端
    printf("*%10d*\n", NUM);
    // *      1234*
    printf("*%-10d*\n", NUM);
    // *1234      *

    /** 3.使用 0 代表在数字前补 0, 输入出现 - /指定精度 则忽略 */
    printf("*%06d*\n", NUM);
    // *001234*
    printf("*%-06d*\n", NUM);
    // *1234  *

    /** 对于浮点数 */
    const double D = 1234.567;

    printf("*%4.2f*\n", D);
    // *1234.57*
    printf("*%+4.2f*\n", D);
    // *+1234.57*
    printf("*%10.2f*\n", D);
    // *   1234.57*
    printf("*%010.2f*\n", D);
    // *0001234.57*
    printf("*%-10.2f*\n", D);
    // *1234.57   *
    printf("*%10.2E*\n", D);
    // * 1.23E+003*

    return 0;
}
```

- 字符串

```c
#include <stdio.h>

#define WORD "Hello World!"

int main(void)
{
    printf("[%2s]\n", WORD);
    // [Hello World!]

    printf("[%20s]\n", WORD);
    // [        Hello World!]

    printf("[%-20s]\n", WORD);
    // [Hello World!        ]

    /** 用 .数字 表示应输出字符串中的多少个字符, 如果超出了原有数量则显示全部 */

    printf("[%20.5s]\n", WORD);
    // [               Hello]
    printf("[%-20.5s]\n", WORD);
    // [Hello               ]
    printf("[%-20.15s]\n", WORD);
    // [Hello World!        ]

    return 0;
}
```

### scanf 的原则

- 以空字符(空格 制表符 换行)作为变量的起始

  (因此输入字符串不能带空格, 使用 fgets 可解决)

- 如果用 scanf()读取**基本变量**类型的值，在变量名前加上一个`&`；

- 如果用 scanf()把**字符串读入字符数组**中，不要使用`&`。

  > & 地址运算符

- scanf **返回读取到目标数据的数量**

  ```c
  printf("%d", scanf("%lf", &db));
  
  // 1. 这里要求输入一个类型 double 的值
  // 2. 如果输入 数字 类型, 返回 1 (数据符合类型)
  // 3. 如果输入 其他 类型, 返回 0 (数据不符合类型)
  ```

  ```c
  printf("%d", scanf("%lf, %d", &db, &i));
  // 根据读取到的数量 可以是 0-2
  ```

### 在循环中读取清除缓冲区的处理**

- 适用于 getchar() scanf() 等输入场景
- 可参考 [[C语言 getchar()原理及易错点解析](https://blog.csdn.net/weixin_44551646/article/details/98076863)]

- 编写一个程序，要求用户输入两个浮点数，并打印两数之差除以两数乘积的结果。

  在用户输入非数字之前，程序应循环处理用户输入的每对值

- 下面这个例子, 去掉 getchar() 当用户输入有误时, 程序会一直循环打印中间的 printf 语句

> 解释:
>
> - 当你输入一个字符按回车后，你实际上是在缓冲区输入了两个字符，一个是你输入的，一个是换行符本身，**这会导致你输入一个字符后, 这个换行符还留在缓冲区里**面, 在下次进入循环时, 读取的参数位置就会出问题
>
> - 解决方法是清除缓冲或吃掉那个回车，方法很多，比如用**fflush(stdin)或者getchar()**

```c
double calc_num(double a, double b);

int main(void)
{
    double a, b;
    do {
        printf("Enter two double: \n");
        // getchar();  // 加上后可防止回车符导致无限循环
        while
    } while (scanf("%lf %lf", &a, &b) != 2);

    printf("Result %lf", calc_num(a, b));
    return 0;
}
... 
```

那加入输入的内容带有未知个空格, 总不能每一个字符都清理一次 getchar()

于是有了更完整的形式:

```c
...  
while (getchar() != 'y') {
        printf("now %d\n", ++n);
		// 通过下面这个 while 读取缓冲区剩余的部分删除缓存
        // 1. 如果里面不是换行符,也就是多余的部分, 相当于什么都不做
        // 2. 如果读取了 \n 可以认为这是用户输入的末端
        // while 不再循环, 缓冲区这个时候也空出来了, 代码继续
        while (getchar() != '\n')
            continue;
    }

    printf("Done\n");
...
```



> https://www.zhihu.com/question/29549162/answer/1363157642
>
> 
>
> 你输入了ab［enter］ （这里的［enter］为回车键），在缓冲区中有上述输入的3个字符。
>
> 在你按下enter时，getchar便开始从缓冲区读取数据。
>
> 因为getchar每次只读取一个字符，第一个getchar读取a，执行a中的情况，然后进入到while那一行，然后接下来由于有getchar 要读取一个字符，而a已经被读取，则读取b，b符合while条件，则进行continue。但是由于while里的getchar不像第一个getchar中的值被赋给了ch，那么就相当于什么都不做。（其实即使被赋给了ch，结果也一样的）然后由于continue，则返回到while循环，getchar又要读取一个字符，则读取的是＼n，相当于读取b的时候什么都没做就读取了＼n，而缓冲区中的数据被读取后，则数据可以近似认为消失，那么b就消失了，即丢弃了b。读取＼n的时候，虽然不满足循环条件，但是它是先读取再判断是否符合条件，也即＼n也和b一样消失了，即被丢弃。
>
> 此时不再进行循环，退出循环，即此步骤只读取了第一个字符，丢弃其余字符。
>
> 此时你再输入新的字符时，因为b和enter被丢弃，下一个读取的不会是b，再下一个也不是enter。此时读取的是你输入的第一个字符。



### printf 和 scanf 的 \* 修饰符

- printf

  - 作用, 允许用户提供字段宽度的占位参数

  - 例子

    ```c
    #include <stdio.h>
    
    int main(void)
    {
        int field;
        int num = 123;
        /**  printf * 修饰符 作用 提供字段宽度 */
    
        printf("Enter width of field\n");
        scanf("%d", &field);
        // 6
    
        // * 用于转换宽度 最后变为 %6d
        printf("field: |%*d|\n", field, num);
        // field: |   123|
    
        float fl = 123.456;
        int   precision;
        printf("Enter width and precision of field\n");
        scanf("%d %d", &field, &precision);
        // 8 2
    
        // * 按参数位次可以有多个, 例如: 用于打印浮点数
        printf("field: |%*.*f|\n", field, precision, fl);
        // field: |  123.46|
    
        return 0;
    }
    ```

- scanf

  - 作用 跳过输出项(比如读取文件特定列内容时, 跳过前置内容)

  - 例子

    ```c
    #include <stdio.h>
    
    int main(void)
    {
        /**  scanf * 修饰符 作用 跳过字段 */
        float salary;
    
        printf("Name Age Gender Salary\n");
    
        scanf("%*s %*d %*s %f", &salary);
        // John 20 Male 12300.32
    
        printf("Oh I' see, your salary is %.2f\n", salary);
        // Oh I' see, your salary is 12300.32
    
        return 0;
    }
    ```

## 字符串

### 使用数组存储字符串

```c
...
    int size, letters;
    char name[40]; // name 是可以容纳 40 个字符的字符数组.

	printf("Hi! What's your first name?\n");
	scanf("%s", name); // 注意，在scanf()中，name没有&前缀，

	size = sizeof name;
    letters = strlen(name);

	printf("%s, your first name has %d letters,\n", name,
	letters);
	printf("and we have %d bytes to store it.\n", size);
	return 0;
...
```

```c
Log:

Hi! What's your first name?
Christine

Christine, your first name has 9 letters,
and we have 40 bytes to store it.
```

- C 语言**没有**专门用于储存字符串的变量类型
- 空字符（null character），**C 语言用它标记字符串的结束**。空字符不是数字 0，它是非打印字符，其 ASCII 码值是（或等价于）0。
- **C 中的字符串一定以空字符结束**，这意味着数组的容量必须至少比待存储字符串中的字符数**多 1**。

#### 字符串与字符 "x" 与 'x'

"x" 是字符串常量, 'x' 则是字符常量

1. 'x' 是基本类型 char, "x" 是派生类型 char[]
2. "x" 实际由两个字符组成, 即 'x' 和 空字符\0(null char)

### strlen()

- 功能: 用于给出字符串变量的**实际字符(不含尾部空字符)(Byte)长度**

- 如果是 sizeof 则为声明大小

- 依赖原型 `string.h`



### getchar()

- 功能: 从输入队列中返回下一个字符

- 不需要转换声明, 只能处理字符

- Example

  ```c
  ch = getchar();
  // 这条语句相当于下面
  scanf("%c", &ch);
  ```

  

### putchar()

- 功能: 打印输入参数字符

- 不需要转换声明, 只能处理字符

- Example

  ```c
  putchar(ch);
  // 这条语句相当于下面
  printf("%c", ch);
  ```

  









## 运算符、表达式和语句

### 表达式 expression

- 表达式由一个或多个**运算符**和**运算对象**组成

- 每个表达式都有一个值

- 关系表达式返回 `真假值`, C 只有 0 是假值,

  其他都是真值



### 语句 statement 

- 语句是 C 的基本构建块, **以分号结尾**

- 一条语句相当于完整的计算机指令

  > a = 1 是表达式
  >
  > a = 1; 是语句

- 最简单的语句是空语句 `;`

- 语句的种类: 

  > C 标准中声明不是语句, C++ 是

  - 空语句

  - 表达式语句 (赋值/函数)

  - 迭代语句 (while / for)

  - 跳转语句 (return / goto)

  - 复合语句 块(花括号包裹)

    > 比如在 while 中包括的块, 块确保了内部的语句都是一次循环的一部分, 内部的子语句被视为一条语句

- 值得注意的是, 初始化可以在函数外部进行

  ```c
  #include <stdio.h>
  
  const int   MAGIC_NUM = 42;
  const float PI        = 3.1415926;
  char        a         = 'A';
  
  int main(void)
  {
      printf("%d %.6f \n", MAGIC_NUM, PI);
      printf("a %c \n", a);
  
      return 0;
  }
  ```

  



### 运算符

#### 赋值运算符 = 

> 赋值运算符的左侧必须引用一个 **特定的存储(内存)位置** (指向一个指针, 只不过变量名有这样的属性) , C 使用 **可修改的左值** (也就是非 const 的对象, const 的初次赋值称为初始化) 标记那些可赋值的实体.

- 左值 lvalue (标识或定位存储位置的标签)
  - 也被称为项 - 运算对象(operand) - 运算符操作的对象
- 右值 rvalue 表达式的值

- 可与算术运算符结合起来 += -= *= /= %=

####  算术运算符

> 以下运算符只能用于数值表达式的计算

- 加法运算符 +
- 减法运算符 -
- 符号运算符 ± 也称一元运算符(只需要一个运算对象)
- 乘法运算符 *
- 除法运算符 /
- 求模运算符 %

> 1. 如果将浮点数和整数一起运算, 则 C 会统一转换为浮点数运算
>
> 2. 如果整数相除是浮点数, C 会截断, 留下整数部分
> 3. 负数的整数除法, 采用 ceil: -3.8 -> -3



#### 关系运算符 

- 外部优先级 低于`算术运算符`, 高于`赋值运算符`

- 内部优先级 `大于小于类`高于`相等不等`

- 相等运算符 `==`

- 不等运算符 `!=`

- `<` , `<=` ,`>=` ,`>`

  > 在比较浮点数时, 尽量只使用 < 和 >. 因为浮点数有舍入误差
  >
  > 比如 1/3 保留小数 6 位,  * 3 乘积是 .999999 != 1
  >
  > 可以使用 math.h 的 fabs() 函数比较, 它返回一个浮点值的绝对值

- 示例 比较浮点数

  ```c
  #include <math.h>
  #include <stdio.h>
  int main(void)
  {
      const double PI = 3.1415926;
      double       user_pi;
  
      printf("What is PI value in your opinion: ");
      scanf("%lf", &user_pi);
      // fabs 比较浮点数 math.h, 返回绝对值
      while (fabs(user_pi - PI) > 0.0001) {  // 绝对值大于目标精度时, 继续让用户输入
          printf("Try again! more precisely\n");
          scanf("%lf", &user_pi);
      }
  
      // 用户输入达到精度要求 结束, 打印
      printf("Right, PI is about %.8f, your inputs: %lf", PI, user_pi);
  
      /*
        What is PI value in your opinion: 3.14
        Try again! more precisely
        3.1415
        Right, PI is about 3.14159260, your inputs: 3.141500
      */
      return 0;
  }
  ```




#### 递增/递减运算符

-  `++a` `a++` `a--` `--a`

- 分前缀模式(先递增再使用)和后缀模式(先使用再递增)

>  优先级很高, 只比圆括号低一级

>  **不要滥用, 会让代码可读性和稳定性降低**
>
> - 变量出现在函数的多个参数中, 不要使用
> - 变量多次出现在同一个表达式中, 不要使用



#### 逻辑运算符

- `&&` 与
- `||` 或
- `!` 非 

> 优先级:
>
> ! 高于算术运算符，同递增运算符，只低于圆括号
>
> && || 两个高于赋值运算符, 低于关系运算符

> 使用 iso646.h 可以使用逻辑运算符的备选 and or not



#### 条件(三元)运算符

```c
variable = expression ? expression_true : expression_false
```





#### sizeof 运算符

`sizeof` 类型大小是 C 语言的内置运算符，以 **字节** **Byte** 为单位给出指定类型的大小。C99 和 C11 提供 `%zd` 转换说明匹配 `sizeof` 的返回类型

> 一些不支持 C99 和 C11 的 编译器可用 `%u` 或 `%lu` 代替 `%zd`。

> 建议所有的 sizeof 调用都使用圆括号包裹变量 sizeof(...)

**在 32/64 位 的系统上常见的变量 size:**

| 类型               | sizeof (Byte 字节) |
| ------------------ | ------------------ |
| char / \_Bool      | 1                  |
| short              | 2                  |
| int / long / float | 4                  |
| double / long long | 8                  |
| long double        | 16                 |



#### 强制类型转换运算符 cast operator

在值的左侧使用如下格式:

`(type)value` 使得右侧的值转换成括号内的指定类型

```c
...
    int i;
    i = (int)(5.0 * 2.0)
    printf("%d", i);
```

```c
    float a = 1.6, b = 1.7;
    int   result;

    result = a + b;  // 3.3
    // 在 printf 中进行自动类型转换, 触发整数的截断
    printf("%d \n", result);  // 3

    // 提前对两个运算对象进行转换
    result = (int)a + (int)b;  // 1 + 1
    printf("%d \n", result);   // 2
```

一般来说都不太应该混合使用类型导致出现上面这两种类型转换情况, 除非这是个 feature 

##### char() 转换函数

- 使用此函数可以将一个 int 类型的值转换成字符 char(int)





#### 逗号运算符

- 优先级最低

-  示例 
  ```c
  // 逗号运算符最常见的使用场景
  for(a = 1, b = a + 2; ... ; a++)
  {
      ...
  }
  ```

- 注意事项
  - 在 `函数传参` 和 `初始化声明` 的时候, 逗号只是做**分隔符**而**不是运算符**
  - `price = 249,500;` 等同于 `price = 249; 500;`, 而 `price = (249,500)` 则等同于舍弃 249, 赋值 500.



## 控制流程

### while

#### 模式

- 块模式 通用 (单行/复合语句)

```c
while (condition)
{
	// statement(s)...
}
```
- 简单语句模式, 无括号模式 (单行语句参与循环)

```c
while (condition)
    // single statement
```

#### 循环条件 

- condition != 0 (不为假)

- 每次循环被称为一次迭代(**iteration**)

#### 终止条件

- 上一次循环结束, 本次循环 condition 为假
- 遇到了 break

#### 注意

```c
while(...);
	// code..;
```

while 本身是一条单独的语句, 如果直接在

判别处**加上分号**, 则循环体就变成了**空语句**,

这个 while 是没有意义的.

> 有时候会有特殊的需求, 比如想跳过输入直到第一个非空字符或数字, 应该这么写:

```c
while(scanf("%d", &num) == 1)
    ; // 注释且单独一行, 方便代码可读性和维护
```



### for

- 模式

```c
for (initialize; test; update)
    statement
```

```c
for (initialize; test; update)
{
    /* code */
}
```

- 循环流程

  ![image-20230827233535323](assets\image-20230827233535323.png)

  1. initialize 初始化  如 i = 0

  2. test 条件表达式

     2.1 为真, 执行内部语句, goto 3

     2.2 为假 goto 4

  3. 执行 update 语句 (i++), goto 2
  4. 结束

- 流程语句可以不写在括号内, 但是要保留分号
- 初始化表达式并不一定要赋值, 可以是任何语句, 只不过这个语句只会在 for 循环开始执行一次.

### do while

> for, while 都是入口条件循环, 即每次迭代之前检查条件,
>
> do while 则是出口条件循环, 即每次迭代之后检查条件,
>
> 这样一来至少会发生一次迭代。

- 模式

  ```c
  do {
      statement
  } while ( expression );
  ```

- 典型用途: 如, 持续获取用户输入直到输入不满足条件语句,

  这样可以少写一次 scanf()

- 注意点: 最好将用户io部分放在迭代的最后, 防止不符合条件时语句继续执行





### if

- 模式

  - 单行(简单)语句

  ```c
  if ( expression )
  	statement
  ```

  - 复合语句

  ```c
  if ( expression )
  {
  	statements
  }
  ```



### if-else-else if

- 模式

  - 单行(简单)语句

  ```c
  if ( expression )
  	statementA
  else
      statementB
  ```

  - 复合语句

  ```c
  if ( expression )
  {
  	statementA
  } else
  {
      statementB
  }
  ```

  - 复合语句 + 简单语句组合 (这是允许的)

  ```c
  if ( expression )
  {
  	statementA
  } else
      statementB
  ```

#### else if

```c
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
```



### if-esle 匹配注意事项*

规则是, 如果没有花括号, **else 与离他最近的 if 匹配**

- 示例1

  ```c
  // 如果不加花括号, else 其实是 与 n < 12 的 if 匹配
  if (n > 6) 
      if (n < 12) 
          printf("You are right");
  else
      printf("You lose");
  
  // n = 5 , 无输出
  // n = 8 , You are right
  // n = 16 , You lose
  ```

- 示例2

  ```c
  // 如果需要让最外层 if else 匹配 必须加上括号(实际也推荐编写代码这样操作)
   if (n > 6) {
       if (n < 12) {
           printf("You are right");
       }
   }
   else
       printf("You lose");
  ```





### 循环 continue break

- 适用于所有类型循环 while for do while

- continue 跳过本次迭代剩余部分

  > for 循环中执行 continue 后会正常执行迭代后的副作用(比如count++),
  >
  > while 则一般没有这种情况(除非判断表达式中做了操作), 只是重复执行代码块

- break 终止循环迭代代码块 和在 switch 语句使用

- 有必要时才使用

  > 如果代码块的判断只有一次, 能够使用多重逻辑序列 比如 && ||,就不需要再后面补充关键字, 避免代码复杂化





### switch 

- 模式

  ```c
  switch (expression)
  {
  	case CONST_VAL: // must be a constant value
      case CONST_VAL2: // (optional) accept multiple values
  		/* code */
  		break; // optional, continue to next case
  	...
  	default:
  		/* optional fallback */;
          break;
  }
  ```

- 示例

  ```c
  int main(void)
  {
      char ch;
  
      printf("enter a char, # to exit: ");
      while ((ch = getchar()) != '#') {
          switch (ch) {
              case 'a':
                  printf("this is a\n");
                  break;
              case 'b':
                  printf("this is b\n");
                  break;
              // 无 break
              case 'c':
                  printf("this is c\n");
              case 'd':
                  printf("this is d or c\n");
                  break;
              // 多 case
              case 'e':
              case 'E':
                  printf("this is e or E\n");
                  break;
              default:
                  printf("404 not found\n");
                  break;
          }
  
          // 跳过剩余部分
          getchar();
          // while (getchar() != '\n')
          //     continue;
  
          printf("Now Enter another one, # to exit: ");
      }
  
      printf("Goodbye!");
      return 0;
  }
  ```







### goto (不推荐)

- 模式

  ```c
  if ( ... ) 
      goto tag_name
     
  tag_name:  
  	// some code
  ```

- 示例

  ```c
      char ch = getchar();
  
      if (ch == 'X')
          goto part_x;
      goto part_nor;
  
  part_x:
      printf("Oh, something happen!\n");
  part_nor:
      printf("normal routine finished.\n");
  ```

> C 语言保留类似 BASIC Fortran 的 goto 能力
> 因为(旧版本)他们没有 break/continue, 而且不支持 if 后跟块或复合语句, 所以这两种语言逻辑上实现不方便, 
>
> C 的 if-else break/continue 相比之, 逻辑更清晰, 结构更先进.(甚至goto 都不用写数字 :笑)
>
> 实际上 break/continue 是 goto 的特殊形式, 只不过语义化
>
> 教材说: **原则上 根本不要在 C 语言中使用 goto**

- 什么时候使用呢? 

  ```c
  for(...) {
  	for (...) {
  		for(...) {
  			if (case) 
  				goto done; // 直接跳出嵌套循环
  		}
  	}
  }
  
  done: .... // 对的 这个时候用就比较方便
  ```

  



## 数组

- 声明

  ```c
  type array_name[length]
  ```

- 初始化(动态数组)

  ```c
  // 声明动态数组并初始化
  int nums[] = {1, 2, 3, 4, 5, 6, 7, 8, 9, 10};
  ```
  
- 赋值

  ```c
  float fl_arr[20];
  
  fl_arr[1] = 20.1;
  scanf("%f", &fl_arr[2]);
  ```

  

## 输入与输出

### 缓冲区

- 英文 `buffer`

- 缓冲输入： 现代计算机系统基本为缓冲输入, 即按下回车之前不会重复打印刚才输入的字符

  输入会被存储到临时缓冲区 `buffer` 内, **按下回车后程序才可以使用。**

- 无缓冲输入可用在游戏对用户操作的响应

<img src="assets/缓冲输入.png" alt="缓冲输入图解" style="zoom: 67%;" />



### 缓冲分类

- 完全缓冲I/O : 缓冲区填满后刷新

  > 通常出现在文件输入中, 大小取决于系统,
  >
  > 512 Bytes / 4096 Bytes

- 行缓冲I/O: 输入出现换行符就刷新

  > 键盘输入通常是行缓冲

- 调用无缓冲的方式?

  在 PC 下, 可以使用 conio.h 

  ```c
  #include <stdio.h>
  #include <conio.h>
  int main(void)
  {
      char ch;
  
      // 引入 conio.h 实现无缓冲输入
      // getche() - 回显的无缓冲 getch() - 无回显无缓冲
      while ((ch = getche()) != '#')
          putchar(ch);
  
      return 0;
  }
  ```

  

### 文件结尾

- 利用 Ctrl+Z (^z) 较老的系统

- 利用文件的大小判断

- C 语言在 getchar() / scanf() 读取文件检测到结尾时返回一个特殊的值

  > `EOF` (end of file), 在 `stdio.h` 有定义: `#define EOF -1`
  >
  > 至于为什么是 -1, 是因为 char 的范围可能是 0~255, 故 -1 不会
  >
  > 代表其他任何字符, 就将其作为文件尾标识。	
  > 因此, 可以使用: (声明 int ch, 因为 EOF 不存在于 char 当中)
  >
  > `while ((ch = getchar()) != EOF)` 判断是否到达文件结尾

- 在 unix 和 linux 可以用 Ctrl+D 实现键盘发送 EOF | PC 则是 Ctrl+Z

  (实测 unix 的 Ctrl+Z 也可以发送 EOF, 但是 PC 用 Ctrl+D 则无效)



### 重定向

准备如下程序 echo-io.c , 这也是上一节所说的反射io程序, 以这个程序配合操作系统重定向,就可以实现 读取文件内容 和 将用户输入的内容写入文本文件

```c
// echo-io.c
#include <stdio.h>

int main(void)
{
    int ch;

    while ((ch = getchar()) != EOF)
        putchar(ch);

    return 0;
}
```



#### 重定向输入 <

模式: `文本读取程序 < 文本文件`

示例: `./echo-io < word.txt` 

结果: 打印 `word.txt` 的内容

#### 重定向输出 >

模式: `文本输入程序(用户输入文本) > 文本文件`

示例: `./echo-io > word.txt`

结果: 输入一段文本, 然后发送 EOF 给命令行, word.txt 内容被**覆写**为刚才的输入

#### 组合重定向

如果希望实现文件拷贝重命名, 还可以这样:

`./echo-io < word > anotherword` 

或者 `/echo-io > anotherword < word `

实现功能与重定向运算符顺序无关, 但是输入输出的文件名不能一致.

有几条原则:

 - 重定向运算符只能连接**一个可执行文件、命令** 和**一个数据文件**
 - 重定向运算符不能连续读取**多个**文件输入和将输出定向至**多个**文件

#### 其他运算符

- `>>` 用于将数据添加到文件末尾, 而不是覆写
- `|` 将文件的输出链接到另一个文件的输入 (例如 linux 的  cmd|grep 'xx' )

## 函数

### 形参和实参

- 对应名词, (形式 formal / actual 实际) + (argument / parameter) ,但是在 C99 规定,  形参是 `parameter`, 实参应该使用 `argument`

  因此变为 formal parameter 形参 | actual parameter 实参

-  缩写 argument -> arg  | parameter -> param



### C 语言的函数基本组成

- 声明函数 **

  - 也称为函数原型, 指明了返回值和入参, 这些信息也被称为函数的**签名**

       ```c
        double power(double n, int p);
        // 这个函数传入两个参数 参数第一位是 double, 第二位是 int
        // 运行完后 函数将返回 double 类型的值
       ```

  - 注意

      > 编译器在首次执行函数前, 需要知道函数的定义
      >
      > 必须通过前置声明预先说明函数的**参数和返回类型**
      >
      > 并将函数原型**放在 main 函数之前**
      
      > 如果函数的定义置于 main **的顶部, 就可以省略**,
      >
      > 否则就是必须的, C 的标准风格则是 main 前置,
      >
      > 除非引入头文件
      
      > 传入函数的变量是局部变量, 如果没有指针引用, 则内部操作
      >
      > 不引起外部的改变
      
      > 通过函数声明, 编译器就可以在入参不符合参数规定的情况下做一次
      >
      > 强制转换并抛出警告, 比如传入 int 参数的 double 类型值,
      >
      > 就会被转换为 int. 而没有函数声明编译器则会根据参数类型
      >
      > 做默认处理, 运行不受影响, 但会导致取出错误的栈值.(书P254)
      
      > 如果返回的类型和return处传递的类型不一致, 会发生强制转换

- 定义函数

  - 包括函数声明部分和函数体

  - ```c
    double power(double n, int p)
    {
        double result = 1;
        int i = 0;
        for(i; i < p; i++) {
            result *= n;
        }
        return result;
    }
    ```





## 指针*

### 一元`&`运算符

C 语言用这个运算符标识指针, 用于存储变量的地址. 一元`&`运算符给出变量的指针

#### 打印指针

- 使用 `%p` 转换声明

  ```c
  {
      int num = 42;
  
      printf("num is %d, its pointer %p", num, &num);
      // num is 42, its pointer 000000000061FE1C
  }
  ```


> 指针是一种新的类型, 所以不能拿指针做数学运算

### 局部变量

下面的 Example 可以看到 在函数 test 中即便传入的都是 num 变量, 他们的内存地址 (指针) 是不一样的, test 中的 num 是局部变量

> C 这样默认传值非传址的设计是为了防止函数本身直接产生的副作用

```c
#include <stdio.h>
void test(int num);

int main(void)
{
    int num = 42;

    // 一元 & 给出变量指针, 并通过 %p 转换声明打印出来
    printf("num is %d, its pointer %#p\n", num, &num);
    // num is 42, its pointer 000000000061FE1C (WINDOWS)
    // num is 42, its pointer 0x7fffe26adf3c  (LINUX)

    test(num);

    return 0;
}

void test(int num)
{
    printf("In function test, num is %d, its pointer %#p\n", num, &num);
    // In function test, num is 42, its pointer 0X000000000061FDF0 (WINDOWS)
    // In function test, num is 42, its pointer 0x7fffe26adf1c (LINUX)
}
```

### 地址位数

上面的演示也能看到，不同系统下内存的位数 bit 可能不一致,

- Windows 下是 16 位 16进制数 -> 16 * 4 =  64 位地址
- Linux/Unix 下是 12 位 16进制数 -> 12 * 4 =  48 位地址



### 使用指针

**指针(内存地址)就是对于计算机来讲你在语句中所声明变量的内部名称**

> 程序员视角 变量名 <-> 值  
>
> 计算机视角 地址 <-> 值

指针 pointer 是一个值为内存地址的变量(或数据对象)，上面的演示说明，

如果不改变相同的内存地址，主函数如 main 的变量是不能在子函数调用修改的。

要将一个变量的内存地址指向另一个变量，可以：

```c
ptr = &value; 
// 把 value 地址赋予 ptr, 所以 ptr 就 "指向" value 的内存地址
// ptr 是左值(变量) ; &value 是右值(常量)
```



### 间接运算符 *

如果 `ptr = &foo;` ，使用**间接运算符** `*` (indirection operator) 找出

存储在 `value` 变量的真实值:

```c
ptr = &foo;
val = *ptr;
/* 上面的语句等价于 */
val = foo;
```

使用指针 & 和间接运算符 *，间接地完成了赋值，这也是间接运算符名称的由来。

>  也称 **解引用运算符**。

> 使用解引用运算符的时候要注意, **不要在未初始化的变量上使用!**
>
> ```c
> // 错误
> double* pd;
> *pd = 1.2;
> ```
>
> 创建一个指针时, 系统只分配了储存指针本身的内存, 而未分配存储数据的内存, 所以是先用已分配的地址初始化指针/ 或者进阶地用 malloc() 手动分配内存。

#### 优先级

* `*` 运算符和自增减`++` `--` 运算符的优先级是相同的, 但如果两者同时出现时, 是从右往左结合

  ```c
  *start++ // 先 start++, 然后 *start, 但指针在取值后才会移动
  *(start)++ // 这样等价, 但更清楚
  (*start)++ // 这样是取到值再+1,改变了原变量指向的值,不是递增指针!    
  *++start // 先移动指针, 再使用移动后的值   
  ```

  如果还不理解, **参考P294程序清单 10.12**



### 声明指针

声明指针变量，需要依赖于所指向的类型，即如果指向 int 就要声明 int 的指针变量

```c
int * num;
char * ch;
float * percent, * rate;
// 新式的写法 紧随类型
double* pi;
```

使用 `*` 号表明声明的变量是指针, *(指针变量) -> 解引用声明的类型 `*num -> int`

> `*` 和指针名称的空格不硬性要求, 但一般声明加空格(或者新式紧跟类型的写法), 解引用变量时省略



### 示例:改变主调函数的变量

```c
#include <stdio.h>

// 因为直接修改, 无需返回值
// 声明指针变量 (类型* 形参 ...)
void swap(int* m, int* n);

int main(void)
{
    /** 使用指针改变主调函数的变量 x, y 交换它们的值 */
    int x = 4, y = 8;

    printf("Before x=%d y=%d\n", x, y);
    // 传入指针(址) 而非传值
    swap(&x, &y);
    printf("After x=%d y=%d\n", x, y);

    // Before x=4 y=8
    // After x=8 y=4
    return 0;
}

void swap(int* m, int* n)
{
    int temp;
    temp = *m;  // 从指针取值
    // 交换, 赋值要解引用 而非 m = *n(将值赋给了指针变量, 错误);
    *m = *n;
    *n = temp;
}
```



## 数组与指针

### 声明 

`数组类型 变量名[数组大小]`

数组大小的声明可以是符号整型常量 也可以是表达式, (不能是浮点或者非正数)

- 使用变量初始化可能不被允许

```c
int a1[5*2 + 1];
int a2[SIZE];
int a3[sizeof(int) + 1];
int a4[(int)2.5]; // 强制转换的浮点数, 不强制转换不行
```

### 初始化

- 使用花括号初始化数组

```c
int arr[10] = {1,2,3,4,5,6,7,8,9,10}; 
const int no_mod[3] = {1,2,3}; // 不可更改的数组
```

- 让编译器自动匹配数组长度 (只能在初始化使用, 不能在声明中使用空括号)

```c
int arr[] = {1,2,3,4,5,6};
```

- 指定初始化器写法

```c
// 传统写法的初始化
int a[6] = {0, 0, 0, 0, 0, 212};
// 指定初始化器(可与普通写法混合)
int b[10] = {1, 2, [4] = 100, [7] = 10, 1234, 5678};

for (int i = 0; i < 10; i++) {
    printf("b[%d] = %d\n", i, b[i]);
}
/*
    使用混合写法后 在指定下标后出现的值会紧跟前面的指定下标
    b[0] = 1
    b[1] = 2
    b[2] = 0
    b[3] = 0
    b[4] = 100
    b[5] = 0
    b[6] = 0
    b[7] = 10
    b[8] = 1234
    b[9] = 5678

*/
```

- 注意事项

  - 对于数值型数组, 如果只进行了部分初始化, 剩余元素都会被初始化为 0;

  - 字符串(字符数组)的部分初始化, 则其他元素为不可打印的字符(应该是内存的一系列垃圾数据)

    ```c
    
        char str[10];
    
        str[0] = 'a';
        str[1] = 'b';
    
        // printf("|%-10s|", str);
        // |ab        |
    
        for (int i = 0; i < 10; i++) {
            printf("str[%d]=%d\n", i, str[i]);
        }
    
        /*
            str[0]=97   <-初始化过的字符
            str[1]=98   <-初始化过的字符
            str[2]=-122
            str[3]=-86
            str[4]=107
            str[5]=85
            str[6]=-4
            str[7]=127
            str[8]=0
            str[9]=0
         */
    
    ```

### 注意事项

- C 的编译器**不检查数组边界**(为了快) 超过数组下标的语句编译器可能不会检查到, 或者会导致错误, 程序异常等等, 使用前要确保下标不越界。（所以推荐使用符号常量声明数组大小）



### 多维数组

- 声明

  `数组类型 变量名[主数组大小][子数组大小][...子子数组大小][...]`

- 初始化(二维数组示例)

  ```c
  float statistic[5][12] = {
      {1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.1, 2.2},
      {1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.1, 2.2},
      {1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.1, 2.2},
      {1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.1, 2.2},
      {1.0, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.7, 1.8, 1.9, 2.1, 2.2},
  };
  ```

<img src="assets\二维数组初始化的两种情况.jpg" alt="二维数组初始化的两种情况" style="zoom: 67%;display:block;margin:auto" />



### 数组与指针的关系*

- 声明一个指针变量, 将数组地址指向它.
- 循环这个数组 打印 （指针 + index）的地址, 探究指针地址与 index 的关系.

```c
#include <stdio.h>

int main(void)
{
    // 创建数组
    int nums[] = {1, 2, 3, 4, 5, 6};
    // 创建数组指针 (赋值的时候不需要加 &)
    int* pta = nums;

    printf("Pointer address %p, value %d\n", pta, *pta);
    // Pointer address 0x7ffccd6c1160, value 1

    for (int i = 0; i < sizeof nums / sizeof *pta; i++) {
        // *(pta + i) == nums[i]
        // pta + i -> 地址后移 sizeof arr[n] -> sizeof int -> 4
        printf("Index:%d, Pointer:%p, Value: %d\n", i, pta + i, *(pta + i));
    }

    /*
      每次递增 4 位, 也就是 对应 int 所占内存 4 字节
      Index:0, Pointer:0x7ffccd6c1160, Value: 1
      Index:1, Pointer:0x7ffccd6c1164, Value: 2
      Index:2, Pointer:0x7ffccd6c1168, Value: 3
      Index:3, Pointer:0x7ffccd6c116c, Value: 4
      Index:4, Pointer:0x7ffccd6c1170, Value: 5
      Index:5, Pointer:0x7ffccd6c1174, Value: 6
     */

    return 0;
}
```



- 可以得出两个结论,

  1. 将数组指向指针变量（不用 &）, **该变量指向的值是数组的第一个元素的值**。

  2. **数组的指针每加 1, 就递增它是指向类型的大小（Byte）** 或者说**指针变量的**

     **变动（自身地址的值）= 有符号整数 * 数组类型大小**, 比如：
     
     - 声明的是 short 数组, 每递增一个元素,地址后移 2 位; 
     
     - 声明的是 double 数组, 每递增一个元素, 地址后移 8 位。
     
     - 数组定义 `arr[n]` 其实就类似 `*(arr + n)`, 
     
       意味为: 到内存的 arr 地址, 移动 n 个单元, 查找这个单元下的值。
     
     ```c
     ptr_arr + 2 == &arr[2] // 相同的地址;
     *(ptr_arr + 2) == arr[2] // 相同的值; 
     // 注意不要使用 *ptr_arr + 2, 这就成了取第一个元素的值再 + 2
     ```

- 还可以引申出来几个结论
  1. 指针的自增减或者减去某个整数**就是回退数组下标**
  2. 两个**来自指向相同数组的**指针求差值，**返回的就是相隔元素的数量**  （不相同的不能保证，可能报错）
  3. 可以用关系运算符比较两个指针的值



### 函数数组形参*

有了上面数组与指针的关系, 我们在函数中使用数组形参就可以通过指针来进行

- 首先声明函数, 可以是以下几种**等价**形式

  ```c
  int fn(int* arr, int size); <- 可用于声明和定义
  int fn(int* , int);  <- 仅声明，函数定义中不能省略
  // ---
  int fn(int arr[], int size); <- 可用于声明和定义
  int fn(int [], int); <- 仅声明，函数定义中不能省略
  ```

- 指针形式(`int* arr`)和 `int arr[]` 形式, 都**表示 arr 是指向 int 的指针**, 但 `int arr[]` 这种形式**只能用在函数做形参**使用, 不过在**语义上更好**,这告诉我们这个形参是个 int 类型的数组。

### 通过宏定义获取数组长度*

很可惜 C 语言如果希望快捷获取数组的长度, 并没有 len(arr) arr.len 这种办法, 

因为函数只能接收 arr 的指针变量, 无法得到函数的实际大小.

**但是, 通过定义宏, 我们也可以实现获取数组长度**

```c
#define ARR_SIZE(arr) sizeof arr / sizeof(arr[0])

int main(void) {
    int nums[] = {1, 2, 3, 4, 5, 6};

    printf("length of nums: %zd\n", ARR_SIZE(nums));
    // length of nums: 6
    
    return 0;
}
```

### 示例：函数数组参数表示法

```c
#include <stdio.h>

// 声明一个统计数组之和的函数 以下两种等价
// unsigned sum(int* arr, int size);  // 指针形式
unsigned sum(int arr[], int size);  // 数组形参形式

int main(void)
{

    int nums[] = {1, 2, 3, 4, 5, 6};

    printf("Sums of nums array: %u", sum(nums, 6));
    // Sums of nums array: 21
    return 0;
}

// 由外部传入函数长度
unsigned sum(int arr[], int size)
{
    unsigned sum;
    printf("Array pointer has sizeof %zd Bytes\n", sizeof arr);
    printf("Array's value has sizeof %zd Bytes\n", sizeof *arr);
    // Array pointer has sizeof 8 Bytes <- 指针变量的大小是 8 字节
    // Array's value has sizeof 4 Bytes <- 这是一个 int/long

    for (int i = 0; i < size; i++) {
        // 已知 *(arr + i) == arr[i] 所以可以直接使用
        sum += arr[i];
    }

    return sum;
}
```



### 示例：函数数组指针表示法

> C 确保数组指针在 start+SIZE 即刚好超过数组末尾的第一个位置时有效。

```c
#include <stdio.h>

#define SIZE 6

unsigned sum_pt(int* start, int* end);

int main(void)
{
    int nums[SIZE] = {1, 2, 3, 4, 5, 6};
    // 数组指向指针 为数组第一位元素 (注意数组整体赋值指针变量时, 不需要 &)
    int* ptr_start = nums;
    //  注意index 是从 0开始的, 将指针指向实际的数组结尾的后一位
    int* ptr_end = ptr_start + SIZE;

    printf("Total of array nums: %u", sum_pt(ptr_start, ptr_end));
    // Total of array nums: 21

    return 0;
}

// 因为 start end 都指向同一数组, 我们不再需要传递数组变量
// 只需要移动指针就可以遍历数组的值
unsigned sum_pt(int* start, int* end)
{
    unsigned sum = 0;

    // 指针地址本身也可以做关系运算
    while (start < end) {
        // sum += *start;
        // start++;

        // 进一步简化
        // sum += *start++; 等价
        sum += *(start++);
    }

    return sum;
}
```





### 总结指针的相关操作

> 详细参阅P296-297

- 可赋值 （数组名、地址运算符&变量名、另一个指针的值 三种）
- 解引用 （*运算符）
- 取址 （&ptr + %p 转换声明）
- 指针整数相加,右移 （== +sizeof type * int)
- 指针整数相减,左移 （== -sizeof type * int)
- 指针自递增递减
- 同指向的指针求差 (得到地址的单位差值int)
- 同指向的指针比较运算
