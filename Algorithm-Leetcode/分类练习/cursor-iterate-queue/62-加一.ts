/**
 给定一个表示 大整数 的整数数组 digits，其中 digits[i] 是整数的第 i 位数字。这些数字按从左到右，从最高位到最低位排列。这个大整数不包含任何前导 0。
 将大整数加 1，并返回结果的数字数组。

    例 1：

    输入：digits = [1,2,3]
    输出：[1,2,4]
    解释：输入数组表示数字 123。
    加 1 后得到 123 + 1 = 124。
    因此，结果应该是 [1,2,4]。
    示例 2：

    输入：digits = [4,3,2,1]
    输出：[4,3,2,2]
    解释：输入数组表示数字 4321。
    加 1 后得到 4321 + 1 = 4322。
    因此，结果应该是 [4,3,2,2]。
    示例 3：

    输入：digits = [9]
    输出：[1,0]
    解释：输入数组表示数字 9。
    加 1 得到了 9 + 1 = 10。
    因此，结果应该是 [1,0]。
 */

function plusOne(digits: number[]): number[] {
    let arr = [...digits]
    let needShift = false // 是否需要进位
    let needPadFirst = false // 是否需要在数组前补1
    for (let i = arr.length - 1; i >= 0; i--) {
        let cur = arr[i]
        if (i === arr.length - 1) cur++ // 循环起始, 最后位+1

        if (needShift) cur++ // 上一位是否进位

        needShift = cur === 10
        if (needShift) {
            arr[i] = 0 // 这次是否进位
            // 如果到末端了, 在数组前还要补1
            if (i === 0)  needPadFirst = true
        } else {
           arr[i] = cur
           break; // 后面的位都不需要处理了
        }

    }

    if (needPadFirst) {
        arr.unshift(1)
    }

    return arr
};

function plusOne2(digits: number[]): number[] {
    for (let i = digits.length - 1; i >= 0; i--) {
        if (digits[i] < 9) {
            digits[i]++;
            return digits; // 遇到某个位置不进位，直接返回
        }
        digits[i] = 0; // 进位，当前位变0，继续处理高位
    }
    // 循环结束还没 return, 故所有位都进位了（如999→1000）
    return [1, ...digits];
}

console.log("🚀 ~ plusOne([1,2,3]):", plusOne2([1,2,3]));
