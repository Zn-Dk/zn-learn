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

- 范围: -32768~32767(由 ISO C 规定, 这是 32 位存储的范围)

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

  与 int 类似，short 是有符号类型, **存储 16 位数字**。

  > unsigned short i;　 i 可以表示 0~65535
  >
  > signed（默认）short i;　 i 可以表示-32768~+32767

- `long int`或`long`

  占用的存储空间可能比 int 多，适用于较大数值的场合。

  与 int 类似，**存储 32 位数字**, long 是有符号类型。

  **在现代系统中, int 的范围通常与 long 相同。**

  > 含 4 个字节，取值范围为：-2^31 ~ (2^31 -1), unsigned 为 64

  > 打印转换说明 `%ld` `%lu`

  > - 如果系统中 int 和 long 的大小相同，使用%d 就行。但是，这样的程序被移植到其他系统（int 和 long 类型的大小不同,老机器）中会无法正常工作。

- `long long int`或`long long`（C99 标准加入）

  占用的储存空间可能比 long 多，适用于更大数值的场合。

  该类型**至少占 64 位**。与 int 类似，long long 是有符号类型。

  > 打印转换说明 `%lld` `%llu`

- `unsigned int`或`unsigned` **无符号整型**

  只用于**非负值**的场合, 默认整型是 `signed`, 即有符号整型, 因此 `unsigned` **可表示的正整数比对应的有符号整型大**。

  例如，16 位 unsigned int 允许的取值范围是 0 ～ 65535，而不是-32768 ～ 32767。用于表示正负号的位现在用于表示另一个二进制位，所以无符号整型可以表示更大的数。

  > 打印转换说明 `%u`

- 在 C90 标准中，添加了`unsigned long int`(`unsigned long`)和

  `unsigned int`或 `unsigned short`类型。

- C99 标准又添加了`unsigned long long int`(`unsigned long long`)。

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

### 浮点数

浮点数类型包含

`float` `double` and `long double`

#### float

> C 标准规定，float 类型必须**至少能表示 6 位有效数字**，且取值范围至少是 `10^-37～10^+37`。前一项规定指 float 类型必须至少精确表示小数点后的 6 位有效数字，如 33.333333。后一项规定用于方便地表示诸如太阳质量（2.0e30 千克）、一个质子的电荷量（1.6e-19 库仑）或国家债务之类的数字。通常， 系统储存一个浮点数要占用 32 位。其中 8 位用于表示指数的值和符号，剩下 24 位用于表示非指数部分（也叫作尾数或有效数）及其符号。

#### double

> 取值范围与 `float` 相同 , 但是至少必须能表示 10 位有效数字。一般情况 下，double 占用 64 位而不是 32 位。一些系统将多出的 32 位全部用来表示非指数部分，这不仅增加了有效数字的位数（即提高了精度），而且还减少了舍入误差。另一些系统把其中的一些位分配给指数部分，以容纳更大的指数，从而增加了可表示数的范围。无论哪种方法，double 类型的值**至少有 13 位有效数字**，超过了标准的最低位数规定。

#### long double

> C 语言的第 3 种浮点类型是 long double，以满足比 double 类型更高的精度 要求。不过，C 只保证 long double 类型至少与 double 类型的精度相同。

---

- 范围: 10^-37 ～ 10^+37 有效数字不定 6/13/+

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

  - **转换说明** `%f` <- float/double %l
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

### sizeof 类型大小

> `sizeof` 是 C 语言的内置运算符，以 **字节** **Byte** 为单位给出指定类型的大小。C99
> 和 C11 提供 `%zd` 转换说明匹配 `sizeof` 的返回类型

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

### printf 和 scanf 的 \* 修饰符

- printf

  - 作用, 提供字段宽度

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

#### 使用数组存储字符串

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

#### strlen()

用于给出字符串变量的**实际字符(不含尾部空字符)(Byte)长度**

如果是 sizeof 则为声明大小

- 依赖原型 `string.h`
