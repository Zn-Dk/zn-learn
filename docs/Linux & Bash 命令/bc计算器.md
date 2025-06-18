## bc 计算器

### 常用运算符 + - * / % ^

### 参数调整
默认不显示小数(scale = 0),
输入 scale=N 调整小数位数

scale=2 表示保留两位小数

```bash
echo "scale=2; 1/3" | bc
```

### 退出 quit