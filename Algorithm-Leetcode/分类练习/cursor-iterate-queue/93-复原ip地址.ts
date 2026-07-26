/*

https://leetcode.cn/problems/restore-ip-addresses/description/

有效 IP 地址 正好由四个整数（每个整数位于 0 到 255 之间组成，且不能含有前导 0），整数之间用 '.' 分隔。

例如："0.1.2.201" 和 "192.168.1.1" 是 有效 IP 地址，但是 "0.011.255.245"、"192.168.1.312" 和 "192.168@1.1" 是 无效 IP 地址。
给定一个只包含数字的字符串 s ，用以表示一个 IP 地址，返回所有可能的有效 IP 地址，这些地址可以通过在 s 中插入 '.' 来形成。你 不能 重新排序或删除 s 中的任何数字。你可以按 任何 顺序返回答案。



示例 1：

输入：s = "25525511135"
输出：["255.255.11.135","255.255.111.35"]
示例 2：

输入：s = "0000"
输出：["0.0.0.0"]
示例 3：

输入：s = "101023"
输出：["1.0.10.23","1.0.102.3","10.1.0.23","10.10.2.3","101.0.2.3"]

1 <= s.length <= 20
*/

// 回溯算法
function restoreIpAddresses(s: string): string[] {
  // 1 <= s.length <= 20
  if (s.length < 4 || s.length > 12) return [] 

  const res:string[] = []
  const isValid = (t: string) => t === '0' || (!t.startsWith('0') && Number(t) <=255)

  // 当前处理到字符串的第几个位置、已经分了几段
  const recur = (curIdx: number, partNum: number, tmpArr: string[]) => {
    // 剪枝：剩余字符数不匹配剩余段数
    if (curIdx < s.length && partNum === 4) return
    // nit不够分 / 分不全 的判断 (初版没做的) =============
    const remaining = s.length - curIdx
    const remainParts = 4 - partNum
    if (remaining < remainParts || remaining > remainParts * 3) return
    // nit =============

    // 当前位置截取1-3 (剪枝大于字符串长度的循环)
    for (let i = 1; i<=3 && curIdx + i <= s.length; i++) {
      const part = s.slice(curIdx, curIdx + i)
      if (isValid(part)) {
        tmpArr.push(part)

        if (partNum + 1 === 4 && curIdx + i === s.length) {
          // 已经分4段时, 检查是否用完
          res.push(tmpArr.join('.'))
        } else {
          // 未够4段继续递归
          recur(curIdx + i, partNum + 1, tmpArr)
        }
        // 调用后回退
        tmpArr.pop()
      }
    }
  }

  recur(0, 0, [])
  console.log(res);
  return res;
};

restoreIpAddresses('0000')
restoreIpAddresses('25525511135')
restoreIpAddresses('101023')
