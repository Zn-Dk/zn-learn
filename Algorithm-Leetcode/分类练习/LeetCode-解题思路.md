
# LeetCode 解题思路笔记

---

## 一、二分查找

### 1. 技巧总结：二分查找模板

#### 固定 mid 写法

统一使用 `const mid = Math.floor((left + right) / 2);`，不需要记忆 `Math.ceil`，只需要在"找最大值"的场景 +1。

#### 模板一：找最小的满足条件的值

> 适用场景：答案区间右半部分都满足条件，要找最左边的那个（如：找最小载重能力、找第一个 ≥ target 的位置）

```typescript
while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (满足条件) {
        right = mid;       // mid 可能是答案，保留它
    } else {
        left = mid + 1;    // mid 不行，排除它
    }
}
return left; // left === right
```

**安全性**：`floor` 使 mid 偏左，`right = mid` 时 right 一定缩小（mid < right），`left = mid + 1` 也一定前进 → ✅ 不会死循环

#### 模板二：找最大的满足条件的值

> 适用场景：答案区间左半部分都满足条件，要找最右边的那个

```typescript
// 找最大的满足条件的值（替代写法）
while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (满足条件) {
        left = mid + 1;    // mid 满足，继续往右探
    } else {
        right = mid;       // mid 不满足，答案在左边
    }
}
// 循环结束时 left === right，指向第一个「不满足」的位置
return left - 1;           // 所以答案是 left - 1
```

#### 对比速查表

| | 模板一（找最小） | 模板二（找最大）
|---|---|---|
| **mid** | `floor((l+r)/2)` |  `floor((l+r)/2)` |
| **满足条件时** | `right = mid` | `left = mid + 1` |
| **不满足时** | `left = mid + 1` | `right = mid` |
| **返回值** | `left` | `left - 1` |

#### 找边界的变体（用于排序数组中查找 target 的边界）

当 target 明确存在于排序数组中，需要找到**第一个**或**最后一个**等于 target 的位置时：

- **找左边界**：命中时 `r = mid - 1`，继续往左搜，用 `idx` 记录位置
- **找右边界**：命中时 `l = mid + 1`，继续往右搜，用 `idx` 记录位置
- 两者都是在命中后**不返回，记录位置，继续收缩**

### 2. LeetCode 34 - 在排序数组中查找元素的第一个和最后一个位置

#### 题目

给你一个按照非递减顺序排列的整数数组 `nums`，和一个目标值 `target`。请你找出给定目标值在数组中的开始位置和结束位置。要求时间复杂度为 **O(log n)**。

```
示例 1：nums = [5,7,7,8,8,10], target = 8 → 输出 [3,4]
示例 2：nums = [5,7,7,8,8,10], target = 6 → 输出 [-1,-1]
示例 3：nums = [], target = 0              → 输出 [-1,-1]
```

#### 我的初始解法（有问题）

思路：先用二分查找定位到 `target`，然后向左右线性扩展找边界。

```typescript
function searchRange(nums: number[], target: number): number[] {
    let res = [-1, -1];
    if (nums.length === 0) return res;
    if (nums.length === 1) {
        return nums[0] === target ? [0, 0] : res;
    }

    let l = 0, r = nums.length - 1;
    while (l <= r) {
        let mid = ~~((l + r) / 2);
        if (nums[mid] === target) {
            let j = mid;
            while (nums[j] === target) {
                res[1] = j;
                j++;
            }
            j = mid;
            while (nums[j] === target) {
                res[0] = j;
                j--;
            }
            // ⚠️ 这里缺少 break 或 return
        }

        if (nums[mid] < target) {
            l = mid + 1;
        } else {
            r = mid - 1;
        }
    }

    return res;
}
```

#### 存在的问题

| 问题 | 说明 |
|------|------|
| ❌ 缺少 `break`/`return` | 命中 target 后没有跳出循环，会继续修改 `l`/`r`，导致重复搜索甚至死循环 |
| ⚠️ 最坏 O(n) | 当数组全是相同元素时（如 `[8,8,8,8,8]`），左右扩展退化为线性扫描，不满足 O(log n) |

#### 标准解法：两次二分查找

核心思想：找到 `target` 后**不立即返回**，而是记录当前位置，继续向左/右收缩搜索范围，直到找到最左/最右的那个。

```typescript
function searchRange(nums: number[], target: number): number[] {
  const findLeft = (nums: number[], target: number): number => {
    let l = 0, r = nums.length - 1, idx = -1;
    while (l <= r) {
      const mid = ~~((l + r) / 2);
      if (nums[mid] === target) {
        idx = mid;
        r = mid - 1; // keep searching left
      } else if (nums[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return idx;
  };

  const findRight = (nums: number[], target: number): number => {
    let l = 0, r = nums.length - 1, idx = -1;
    while (l <= r) {
      const mid = ~~((l + r) / 2);
      if (nums[mid] === target) {
        idx = mid;
        l = mid + 1; // keep searching right
      } else if (nums[mid] < target) {
        l = mid + 1;
      } else {
        r = mid - 1;
      }
    }
    return idx;
  };

  return [findLeft(nums, target), findRight(nums, target)];
}
```

#### 关键对比

| 维度 | 我的解法 | 标准解法 |
|------|---------|---------  |
| 正确性 | ❌ 缺少 break/return，有 bug | ✅ |
| 时间复杂度 | O(n) 最坏情况 | O(log n) |
| 代码简洁度 | 一般 | 结构清晰 |

### 3. LeetCode 1011 - 在 D 天内送达包裹的能力

#### 题目

传送带上的包裹必须在 `days` 天内从一个港口运送到另一个港口。传送带上的第 `i` 个包裹的重量为 `weights[i]`。每一天，我们都会按给出重量的顺序往传送带上装载包裹。装载的重量不会超过船的最大运载重量。返回能在 `days` 天内将传送带上的所有包裹送达的船的**最低运载能力**。

```
示例：weights = [1,2,3,4,5,6,7,8,9,10], days = 5 → 输出 15
```

#### 我的初始解法（有问题）

```typescript
function shipWithinDays(weights: number[], days: number): number {
  const canLoad = (capacity: number, days: number) => {
    let curLoaded = 0;
    let goodIdx = 0;
    let rest = days;
    while (rest > 0) {
      if (curLoaded + weights[goodIdx] <= capacity) {
        curLoaded += weights[goodIdx];
        goodIdx++;
      } else {
        rest--;
        curLoaded = 0;
      }
    }
    return goodIdx === weights.length;
  };

  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b, 0);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canLoad(mid, days)) {
      right = mid;
    } else {
      left = mid + 1;
    }
  }
  return right;
}
```

#### 存在的问题

| 问题 | 说明 |
|------|------|
| ❌ 缺少 `goodIdx` 越界检查 | 所有货物在天数用完前装完时，`weights[goodIdx]` 为 `undefined`，依赖 `NaN` 的行为碰巧得到正确结果 |
| ❌ 天数消耗逻辑有偏差 | 装不下时才消耗天数（`rest--`），最后一天装完后没消耗天数，相当于有 `days + 1` 天可用 |

#### 修正后的解法：模板一（找最小满足条件的值）

这是一个典型的「二分查找 + 判定函数」题目。搜索区间为 `[max(weights), sum(weights)]`，使用模板一找最小的满足条件的载重。

```typescript
function shipWithinDays(weights: number[], days: number): number {
  const canLoad = (capacity: number, days: number) => {
    let curLoaded = 0;
    let needDays = 1; // 至少需要1天

    for (let i = 0; i < weights.length; i++) {
      if (curLoaded + weights[i] <= capacity) {
        curLoaded += weights[i];
      } else {
        needDays++;
        curLoaded = weights[i];
      }
    }
    return needDays <= days;
  };

  // 二分查找：找到最小的能装下所有物品的容量
  let left = Math.max(...weights);
  let right = weights.reduce((a, b) => a + b, 0);
  while (left < right) {
    const mid = Math.floor((left + right) / 2);
    if (canLoad(mid, days)) {
      right = mid;     // mid 能装完 → 尝试更小的容量
    } else {
      left = mid + 1;  // mid 装不完 → 容量太小
    }
  }
  return left; // left === right
}
```

#### 关键点

- **搜索区间**：`left = max(weights)`（至少要能装最重的包裹），`right = sum(weights)`（一天全运完）
- **判定函数**：`canLoad` 模拟装载过程，计算需要几天
- **二分方向**：找最小满足条件的值 → 模板一，`right = mid` + `left = mid + 1`

---

## 二、链表

### 1. 技巧总结：Dummy 节点（哨兵节点）

#### 核心价值

**消除"头节点需要特殊处理"的情况**。每当你发现自己在写 `if (!head)` 或 `if (!res)` 这类特判逻辑，就该想到 dummy 节点。

#### 场景 1：从无到有构建新链表

**特征**：结果链表一开始是空的，循环中不断往后追加节点。

**典型题目**：LeetCode 2、21、23

```typescript
const dummy = new ListNode(0);
let tail = dummy;

while (...) {
    tail.next = new ListNode(val);
    tail = tail.next;
}

return dummy.next;
```

#### 场景 2：删除节点，且头节点可能被删

**特征**：遍历链表删除满足条件的节点，但头节点本身也可能要被删。

**典型题目**：LeetCode 203、82、19

```typescript
const dummy = new ListNode(0, head);
let cur = dummy;

while (cur.next !== null) {
    if (cur.next.val === val) {
        cur.next = cur.next.next;
    } else {
        cur = cur.next;
    }
}

return dummy.next;
```

#### 场景 3：拆分 / 重排链表

**特征**：把一条链表拆成多条、或者重新排列节点顺序。

**典型题目**：LeetCode 86、328

```typescript
const smallDummy = new ListNode(0);
const largeDummy = new ListNode(0);
let small = smallDummy, large = largeDummy;

while (head !== null) {
    if (head.val < x) { small.next = head; small = small.next; }
    else              { large.next = head; large = large.next; }
    head = head.next;
}

large.next = null;
small.next = largeDummy.next;
return smallDummy.next;
```

#### 快速决策流程

```
拿到链表题
  ├─ 需要构建新链表？ → ✅ 用 dummy + tail 指针
  ├─ 可能删除头节点？ → ✅ 用 dummy 指向 head
  ├─ 需要拆分/重排？  → ✅ 用多个 dummy 分别收集
  └─ 以上都不是       → ❌ 不需要 dummy
```

#### 一句话总结

> 当你发现"第一个节点"和"后续节点"的处理逻辑不一样时，就在前面加一个 dummy 节点让它们统一起来。

### 2. LeetCode 2 - 两数相加

#### 题目

给你两个非空链表，表示两个非负整数。每位数字逆序存储，每个节点只存一位数字。将两数相加，返回一个新链表。

```
示例 1：l1 = [2,4,3], l2 = [5,6,4] → 输出 [7,0,8]（342 + 465 = 807）
示例 2：l1 = [0], l2 = [0]         → 输出 [0]
示例 3：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9] → 输出 [8,9,9,9,0,0,0,1]
```

#### 我的初始解法（有问题）

```typescript
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let res = null;
    let c1 = l1, c2 = l2;
    let nextShift = false;

    while (c1 !== null || c2 !== null) {
        let cur = null;
        if (!res) {
            res = new ListNode(0);
            cur = res;
        } else {
            const n = new ListNode(0);
            res.next = n;  // ⚠️ 永远挂在 res.next，覆盖前面的节点
            cur = n;
        }

        let c = (c1?.val || 0) + (c2?.val || 0);
        if (nextShift) {
            c += 1;
            nextShift = false;
        }
        if (c >= 10) {
            nextShift = true;
            cur.val += c - 10;
        } else {
            cur.val += c;
        }
        c1 = c1?.next;
        c2 = c2?.next;
    }
    return res;
}
```

#### 存在的问题

| 问题 | 说明 |
|------|------|
| ❌ `res.next` 覆盖 | `res` 始终指向头节点，每次 `res.next = n` 都覆盖同一个位置，链表永远只有两个节点 |
| ❌ 缺少最后进位处理 | 循环结束后如果还有进位（如 `999...9 + 999...9`），缺少追加值为 1 的尾节点 |
| ⚠️ 头节点特判 | `if (!res)` 判断第一个节点的逻辑冗余，增加了代码复杂度 |

#### 修正后的解法：Dummy Head + Tail 指针

```typescript
function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0); // dummy head, simplifies logic
    let tail = dummy;
    let c1 = l1;
    let c2 = l2;
    let carry = false;

    while (c1 !== null || c2 !== null) {
        let c = (c1?.val ?? 0) + (c2?.val ?? 0);

        if (carry) {
            c += 1;
            carry = false;
        }

        if (c >= 10) {
            carry = true;
            c -= 10;
        }

        tail.next = new ListNode(c);
        tail = tail.next; // move tail forward

        c1 = c1?.next ?? null;
        c2 = c2?.next ?? null;
    }

    // handle the last carry
    if (carry) {
        tail.next = new ListNode(1);
    }

    return dummy.next; // skip the dummy head
}
```

#### 关键改动

`tail` 指针追踪链表尾部，每次新节点都挂到 `tail.next`，然后 `tail` 后移：

```
初始状态:  dummy(0)
                ↑ tail

第1轮:     dummy(0) → 7
                       ↑ tail

第2轮:     dummy(0) → 7 → 0
                            ↑ tail

第3轮:     dummy(0) → 7 → 0 → 8
                                ↑ tail
```

最终返回 `dummy.next`，跳过哨兵节点。

### 3. LeetCode 21 - 合并两个有序链表

#### 解法：Dummy + Tail

```typescript
function mergeTwoLists(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    const dummy = new ListNode(0);
    let tail = dummy;

    while (l1 !== null && l2 !== null) {
        if (l1.val <= l2.val) {
            tail.next = l1;
            l1 = l1.next;
        } else {
            tail.next = l2;
            l2 = l2.next;
        }
        tail = tail.next;
    }

    tail.next = l1 ?? l2;
    return dummy.next;
}
```

### 4. LeetCode 203 - 移除链表元素

#### 解法：Dummy 指向 head

```typescript
function removeElements(head: ListNode | null, val: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let cur = dummy;

    while (cur.next !== null) {
        // 不用 dummy 的话，得先 while 循环跳过所有值为 val 的头节点，
        // 再处理中间节点，逻辑很碎：
        // without dummy — messy
        // while (head && head.val === val) head = head.next;
        // let cur = head;
        // while (cur?.next) {
        //     if (cur.next.val === val) cur.next = cur.next.next;
        //     else cur = cur.next;
        // }
        // return head;

        // 有dummy, 只管判断, 往后接
        if (cur.next.val === val) {
            cur.next = cur.next.next;
        } else {
            cur = cur.next;
        }
    }

    return dummy.next;
}
```

### 5. LeetCode 19 - 删除链表的倒数第 N 个节点

#### 解法：Dummy + 快慢指针

```typescript
function removeNthFromEnd(head: ListNode | null, n: number): ListNode | null {
    const dummy = new ListNode(0, head);
    let fast: ListNode | null = dummy;
    let slow: ListNode | null = dummy;

    for (let i = 0; i <= n; i++) {
        fast = fast!.next;
    }

    while (fast !== null) {
        fast = fast.next;
        slow = slow!.next;
    }

    slow!.next = slow!.next!.next;
    return dummy.next;
}
```

### 6. LeetCode 86 - 分隔链表

#### 解法：双 Dummy 拆分收集

把小于 `x` 的节点排到前面，大于等于 `x` 的排后面。

```
输入：1 → 4 → 3 → 2 → 5 → 2, x = 3
输出：1 → 2 → 2 → 4 → 3 → 5
```

```typescript
function partition(head: ListNode | null, x: number): ListNode | null {
    const smallDummy = new ListNode(0);
    const largeDummy = new ListNode(0);
    let small = smallDummy;
    let large = largeDummy;

    while (head !== null) {
        if (head.val < x) {
            small.next = head;
            small = small.next;
        } else {
            large.next = head;
            large = large.next;
        }
        head = head.next;
    }

    large.next = null;
    small.next = largeDummy.next;
    return smallDummy.next;
}
```

---

## 三、回溯（DFS）

### 1. 技巧总结：回溯模板

#### 核心思想

回溯本质是**带剪枝的深度优先搜索（DFS）**。通过递归逐步构建解，当发现当前路径不可能产生有效解时立即回退（回溯），尝试下一个选择。

适用于：**组合、排列、子集、分割** 等需要穷举所有方案的问题。

#### 通用模板

```typescript
function backtrack(选择列表, 路径, 结果集) {
    if (满足结束条件) {
        结果集.push(路径的拷贝);
        return;
    }

    for (const 选择 of 选择列表) {
        // 做选择
        路径.push(选择);
        // 递归进入下一层
        backtrack(剩余选择列表, 路径, 结果集);
        // 撤销选择（回溯）
        路径.pop();
    }
}
```

#### 三个关键要素

| 要素 | 说明 |
|------|------|
| **路径** | 已经做出的选择（当前正在构建的解） |
| **选择列表** | 当前步骤可以做的选择 |
| **结束条件** | 到达决策树底层，路径构成一个完整解 |

#### 回溯 vs 普通 DFS

- **普通 DFS**：遍历整棵树/图，不关心"路径"
- **回溯**：关注路径本身，核心操作是 "选择 → 递归 → 撤销选择"

#### 去重 / 剪枝技巧

- **排列去重**：先排序，跳过与前一个相同的已用元素
- **组合去重**：用 `startIndex` 控制选择范围，避免重复子集
- **提前剪枝**：在循环中判断是否已不可能满足条件，直接 `continue` 或 `break`

### 2. LeetCode 17 - 电话号码的字母组合

#### 题目

给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。

```
示例：digits = "23" → ["ad","ae","af","bd","be","bf","cd","ce","cf"]
```

#### 解法一：迭代（逐层笛卡尔积）

思路：逐个处理数字，将已有组合与当前数字对应的字母做笛卡尔积展开。

```typescript
function letterCombinations(digits: string): string[] {
    let combo: string[] = [];
    const rest = digits.split('');

    while (rest.length > 0) {
        const cur = rest.shift()!;
        const letters = digitMap[cur];
        if (combo.length === 0) {
            combo.push(...letters);
        } else {
            const newCombo: string[] = [];
            for (const item of combo) {
                for (const letter of letters) {
                    newCombo.push(item + letter);
                }
            }
            combo = newCombo;
        }
    }
    return combo;
}
```

- 本质是 BFS 层序展开
- 正确性：✅（空字符串返回 `[]`，边界正确）
- 缺点：需要保存所有中间组合，内存占用较大

#### 解法二：回溯 DFS（面试首选）

思路：用 `index` 标记当前处理到第几个数字，递归地选取每个数字对应的字母，到达末尾时收集结果。

```typescript
const digitMap = {
    2: ['a', 'b', 'c'],
    3: ['d', 'e', 'f'],
    4: ['g', 'h', 'i'],
    5: ['j', 'k', 'l'],
    6: ['m', 'n', 'o'],
    7: ['p', 'q', 'r', 's'],
    8: ['t', 'u', 'v'],
    9: ['w', 'x', 'y', 'z'],
};

function letterCombinations(digits: string): string[] {
    if (!digits) return [];
    const res: string[] = [];

    function backtrack(index: number, path: string) {
        // 结束条件：处理完所有数字，收集结果
        if (index === digits.length) {
            res.push(path);
            return;
        }
        // 选择列表：当前数字对应的所有字母
        for (const ch of digitMap[digits[index]]) {
            // 做选择 + 递归（这里用 path + ch 代替 push/pop，字符串不可变无需手动回溯）
            backtrack(index + 1, path + ch);
        }
    }

    backtrack(0, '');
    return res;
}
```

#### 回溯过程可视化（digits = "23"）

```
backtrack(0, "")
├── 选 'a' → backtrack(1, "a")
│   ├── 选 'd' → backtrack(2, "ad") → 收集 "ad"
│   ├── 选 'e' → backtrack(2, "ae") → 收集 "ae"
│   └── 选 'f' → backtrack(2, "af") → 收集 "af"
├── 选 'b' → backtrack(1, "b")
│   ├── 选 'd' → backtrack(2, "bd") → 收集 "bd"
│   ├── 选 'e' → backtrack(2, "be") → 收集 "be"
│   └── 选 'f' → backtrack(2, "bf") → 收集 "bf"
└── 选 'c' → backtrack(1, "c")
    ├── 选 'd' → backtrack(2, "cd") → 收集 "cd"
    ├── 选 'e' → backtrack(2, "ce") → 收集 "ce"
    └── 选 'f' → backtrack(2, "cf") → 收集 "cf"
```

#### 为什么这题不需要显式"撤销选择"？

通常回溯需要 `path.push()` → 递归 → `path.pop()`。但这里用的是 `path + ch` 传参，**字符串是不可变类型**，每次递归都是新字符串，函数返回后 `path` 自动恢复原值，隐式完成了回溯。

如果用数组来存路径，则需要显式回溯：

```typescript
function backtrack(index: number, path: string[]) {
    if (index === digits.length) {
        res.push(path.join(''));
        return;
    }
    for (const ch of digitMap[digits[index]]) {
        path.push(ch);          // 做选择
        backtrack(index + 1, path);
        path.pop();             // 撤销选择（回溯）
    }
}
```

#### 方案对比

| 方案 | 时间复杂度 | 空间复杂度 | 面试推荐度 |
|------|-----------|-----------|-----------|
| 迭代笛卡尔积 | O(3^n × 4^m) | O(3^n × 4^m)（存所有中间态） | ⭐⭐⭐ |
| 回溯 DFS | O(3^n × 4^m) | O(n) 递归栈 + O(结果集) | ⭐⭐⭐⭐⭐ |

> n = 对应 3 个字母的数字个数，m = 对应 4 个字母的数字个数（7 和 9）

### 3. LeetCode 39 - 组合总和

#### 题目

给你一个**无重复元素**的整数数组 `candidates` 和一个目标整数 `target`，找出所有和为 `target` 的不同组合。同一个数字可以**无限制重复选取**。

```
示例 1：candidates = [2,3,6,7], target = 7 → [[2,2,3],[7]]
示例 2：candidates = [2,3,5], target = 8   → [[2,2,2,2],[2,3,3],[3,5]]
示例 3：candidates = [2], target = 1       → []
```

#### 解法：回溯 DFS + startIndex 去重

核心思路：每次从 `index` 开始选（不回头），允许重复选自己（递归传 `i` 而非 `i + 1`）。

```typescript
function combinationSum(candidates: number[], target: number): number[][] {
    const res: number[][] = [];

    const dfs = (index: number, target: number, path: number[]) => {
        if (target === 0) {
            res.push([...path]); // 收集结果（拷贝）
            return;
        }
        if (target < 0) return; // 剪枝：超过目标

        for (let i = index; i < candidates.length; i++) {
            path.push(candidates[i]);
            dfs(i, target - candidates[i], path); // 传 i：允许重复选当前元素
            path.pop(); // 撤销选择（回溯）
        }
    };

    dfs(0, target, []);
    return res;
}
```

#### 回溯过程可视化（candidates = [2,3,6,7], target = 7）

```
dfs(0, 7, [])
├── 选 2 → dfs(0, 5, [2])
│   ├── 选 2 → dfs(0, 3, [2,2])
│   │   ├── 选 2 → dfs(0, 1, [2,2,2])
│   │   │   ├── 选 2 → dfs(0, -1, ...) → 剪枝
│   │   │   ├── 选 3 → dfs(1, -2, ...) → 剪枝
│   │   │   └── ...
│   │   ├── 选 3 → dfs(1, 0, [2,2,3]) → ✅ 收集
│   │   ├── 选 6 → dfs(2, -3, ...) → 剪枝
│   │   └── 选 7 → dfs(3, -4, ...) → 剪枝
│   ├── 选 3 → dfs(1, 2, [2,3])
│   │   ├── 选 3 → dfs(1, -1, ...) → 剪枝
│   │   └── ...
│   ├── 选 6 → dfs(2, -1, ...) → 剪枝
│   └── 选 7 → dfs(3, -2, ...) → 剪枝
├── 选 3 → dfs(1, 4, [3])
│   ├── 选 3 → dfs(1, 1, [3,3])
│   │   └── ... → 全部剪枝
│   └── ...
├── 选 6 → dfs(2, 1, [6])
│   └── ... → 全部剪枝
└── 选 7 → dfs(3, 0, [7]) → ✅ 收集
```

#### 关键点

| 要点 | 说明 |
|------|------|
| **去重方式** | 循环从 `index` 开始，不回头选前面的元素，避免 `[2,3]` 和 `[3,2]` 重复 |
| **允许重复选** | 递归传 `i`（不是 `i + 1`），所以同一元素可以被选多次 |
| **剪枝** | `target < 0` 立即返回，避免无效递归 |
| **收集结果** | `target === 0` 时拷贝 path（`[...path]` 或 `path.slice()`） |

#### 与第 17 题的对比

| 维度 | 第 17 题（电话号码） | 第 39 题（组合总和） |
|------|---------------------|---------------------|
| 选择列表 | 当前数字对应的字母（固定） | candidates 中从 index 开始的元素 |
| 能否重复选 | ❌ 每个数字只处理一次 | ✅ 同一元素可重复选（传 `i`） |
| 结束条件 | `index === digits.length` | `target === 0` |
| 剪枝 | 无需（每层选择有限） | `target < 0` 提前返回 |
| 回溯方式 | 字符串不可变，隐式回溯 | 数组 push/pop 显式回溯 |

#### 进阶优化：排序后剪枝

如果先对 `candidates` 排序，当 `candidates[i] > target` 时可以直接 `break`（后面的更大，肯定超）：

```typescript
candidates.sort((a, b) => a - b);

// 循环内加一行：
for (let i = index; i < candidates.length; i++) {
    if (candidates[i] > target) break; // 后面的都更大，直接剪掉
    // ...
}
```
