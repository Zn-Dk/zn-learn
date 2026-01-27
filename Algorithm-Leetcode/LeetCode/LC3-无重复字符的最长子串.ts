/** 
 * 题目描述
    给定一个字符串 s，请你找出其中不含有重复字符的 最长子串 的长度。

    解题思路
    使用 滑动窗口 技术：

    维护一个窗口 [left, right]，窗口内的字符都是不重复的

    使用 Map 或 Set 记录窗口内字符及其位置

    当遇到重复字符时，移动左边界跳过重复字符

    每次更新最大长度
 */

function lengthOfLongestSubstring2(s: string): number {
  // 使用 Map 记录字符最后出现的位置
  const charIndexMap = new Map<string, number>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    const char = s[right];

    // 如果字符已存在且在当前窗口内，移动左边界
    if (charIndexMap.has(char) && charIndexMap.get(char)! >= left) {
      left = charIndexMap.get(char)! + 1;
    }

    // 更新字符位置
    charIndexMap.set(char, right);

    // 更新最大长度
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}

function lengthOfLongestSubstring(s: string): number {
  const seen = new Set<string>();
  let maxLength = 0;
  let left = 0;

  for (let right = 0; right < s.length; right++) {
    // 当遇到重复字符时，收缩左边界
    while (seen.has(s[right])) {
      seen.delete(s[left]);
      left++;
    }
--
    seen.add(s[right]);
    maxLength = Math.max(maxLength, right - left + 1);
  }

  return maxLength;
}
