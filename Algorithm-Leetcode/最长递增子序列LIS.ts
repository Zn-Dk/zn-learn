// 最长递增子序列 LIS

// 题目1: 给定一个数组，求出最长递增子序列长度 (如果进阶的, 还需要打印这个序列)
// 最长递增子序列不一定要连续的, 只需要从数组序号上是递增的即可
// 例如 [1, 5, 2, 6, 3, 7]
// LIS == 4 [1, 2, 6, 7] / [1, 2, 3, 7] / [1, 5, 6, 7]

// 问题: 如何求出最长递增子序列长度?
// 答案: 动态规划 DP

// 问题: 如果有多个最长递增子序列, 如何一并打印出来?
// 答案: 需要记录每个状态的前一个状态, 即从哪个状态转移过来的

// DP 原理
// 维护一个与输入数组等长的 DP 数组, DP[i] 表示以 nums[i] 结尾的最长递增子序列长度
// 初始化 DP 全部元素为 1, 意为所有元素自成一个子序列 长度为 1

// reference: https://www.bilibili.com/video/BV1Mh1nBQE2A


/**
 * 求最长递增子序列长度及其中一条路径（单前驱版本）
 *
 * 算法思路：
 * 1. 使用动态规划，dp[i] 表示以 nums[i] 结尾的最长递增子序列长度
 * 2. 状态转移方程：dp[i] = max(dp[j] + 1)，其中 j < i 且 nums[j] < nums[i]
 * 3. 使用 parent 数组记录每个位置的前驱索引，用于回溯路径
 *
 * 时间复杂度：O(n²)
 * 空间复杂度：O(n)
 *
 * 限制：
 * - parent 数组只记录一个前驱，所以只能重建一条最长递增子序列
 * - 如果存在多条等长的最长递增子序列，只能找到其中一条
 * - 要找到所有路径，需要使用多前驱版本（见 getLISLen2）
 *
 * @param nums - 输入数组
 * @returns { lis: 最长递增子序列长度, lisPath: 其中一条最长递增子序列 }
 */
const getLISLen = (nums: number[]) => {
  // dp[i] 表示以 nums[i] 结尾的最长递增子序列长度，初始化为 1（每个元素自成一个序列）
  const dp = new Array(nums.length).fill(1);

  // parent[i] 记录位置 i 的前驱索引，-1 表示没有前驱（起点）
  // 注意：这里只记录一个前驱，所以只能重建一条路径
  const parent = new Array(nums.length).fill(-1);

  // 双重循环：外层 i 遍历每个位置，内层 j 遍历 i 之前的所有位置
  for (let i = 0; i < nums.length; i++) {
    const pre = i - 1;
    if (pre < 0) continue; // 第一个元素没有前驱，跳过

    for (let j = 0; j <= pre; j++) {
      // 如果 nums[i] > nums[j]，说明可以将 nums[i] 接在以 nums[j] 结尾的序列后面
      if (nums[i] > nums[j]) {
        // 只有当通过 j 转移能得到更长的序列时，才更新 dp[i] 和 parent[i]
        // 这个判断很关键：确保 parent[i] 记录的是真正导致 dp[i] 增加的前驱
        if (dp[j] + 1 > dp[i]) {
          dp[i] = dp[j] + 1;
          parent[i] = j; // 记录前驱索引，用于后续回溯路径
        }
      }
    }
  }

  console.log('[dp]', dp);
  console.log('[parent]', parent);

  // 最长递增子序列长度 = dp 数组中的最大值
  const lis = Math.max(...dp);

  // 步骤 1：找到第一个 dp 值等于 lis 的位置作为回溯起点
  const lisIndex = dp.indexOf(lis);

  // 步骤 2：通过 parent 数组回溯重建路径
  // 注意：这里只能重建一条路径，因为 parent[i] 只存了一个前驱索引
  // 如果某个位置有多个前驱都能形成最长序列，这种方法会丢失其他路径
  const lisPath: number[] = [];
  let cur = lisIndex;

  // 从终点开始，沿着 parent 链向前回溯，直到到达起点（parent[cur] === -1）
  // 例如：parent = [-1, 0, 0, 1, 2, 3]，从索引 5 开始
  // 回溯路径：5 -> 3 -> 1 -> 0 -> -1（结束）
  while (cur !== -1) {
    lisPath.push(nums[cur]); // 将当前位置的值加入路径
    cur = parent[cur];       // 移动到前驱位置
  }

  // 步骤 3：反转路径，因为回溯是从后往前的
  lisPath.reverse();

  return {
    lis,      // 最长递增子序列的长度
    lisPath,  // 其中一条最长递增子序列
  };
}
/**
 *  索引:    0   1   2   3   4   5
    数组:   [1,  5,  2,  6,  3,  7]
    dp:     [1,  2,  2,  3,  3,  4]  ← 以每个位置结尾的最长递增子序列长度
    parent: [-1, 0,  0,  1,  2,  3]  ← 记录前驱索引
 */
let nums = [1, 5, 2, 6, 3, 7];
console.log(getLISLen(nums));


// 如果要记录所有最长递增子序列, 需要修改 parent, 记录所有前驱索引

const getLISLen2 = (nums: number[]) => {
  const dp = new Array(nums.length).fill(1);
  // 改为数组，记录所有可能的前驱
  const parents: number[][] = Array.from({ length: nums.length }, () => []);

  for (let i = 0; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        if (dp[j] + 1 > dp[i]) {
          // 找到更长的序列，清空之前的前驱，记录新的
          dp[i] = dp[j] + 1;
          parents[i] = [j];
        } else if (dp[j] + 1 === dp[i]) {
          // 找到同样长度的其他序列，添加到已有的前驱列表
          parents[i].push(j);
        }
      }
    }
  }

  const lis = Math.max(...dp);

  // 找出所有以最长长度结尾的位置
  const lisIndexes: number[] = [];
  dp.forEach((item, index) => {
    if (item === lis) {
      lisIndexes.push(index);
    }
  });

  // DFS 回溯所有路径
  const allPaths: number[][] = [];
  // console.log('[parents]', parents);
  const dfs = (index: number, path: number[]) => {
    path.unshift(nums[index]);
    // console.log('dfs', index, path);

    if (parents[index].length === 0) {
      // 到达起点 结束
      allPaths.push([...path]);
      return;
    }

    // 遍历所有前驱
    for (const child of parents[index]) {
      // console.log('parents', parents[index], 'child', child);
      dfs(child, [...path]);
    }
  };

  lisIndexes.forEach(index => {
    dfs(index, []);
  });

  return {
    lis,
    resPaths: allPaths,
  };
};

console.log(getLISLen2(nums));


