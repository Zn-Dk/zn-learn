// 汉诺塔问题, 给定 n 个柱子,
//  从第一个柱子上移动 n 个盘子到第三个柱子上, 不能把大盘子放在小盘子上
//  一次只能移动一个盘子, 请问最少需要多少步, 并打印出每一步的移动过程

// 我们假定三个柱子分别是 F(rom) A(ssist) T(o) 分别代表从、辅助、到

// 归纳法可得出这是一个递归问题 也是分治思想 固定的二分（n-1 和 1）

/*
    |       |       |
   [ ]      |       |
  [   ]     |       |
  -----   -----   -----

    F       A       T


    1.  n = 1 时, 直接从 F 移动到 T
    2.  n > 1 时(这里我们就用最简单的 n = 2), 先将 n-1 个盘子从 F 移动到 A,
        然后将第 n 个盘子从 F 移动到 T, 最后将 n-1 个盘子从 A 移动到 T

    3. 递推关系：T(n) = 2T(n-1) + 1
    4.时间复杂度：O(2^n)
    这意味着：

    3个盘子需要 7 步
    10个盘子需要 1023 步
    64个盘子需要 18,446,744,073,709,551,615 步（传说中的汉诺塔故事）
*/


const log = (n: number, from: string, to: string) => {
  console.log(`第 ${n} 个盘子从 ${from} 移动到 ${to}`);
}

const hanoi = (n: number, from = 'F', assist = 'A', to = 'T') => {
  if (n === 1) {
    log(n, from, to);
    return 1;
  }

  let count = 0;
  if (n > 1) {
    //              n      F     A     T     (第二和第四个参数决定 从 -> 到)
    count += hanoi(n - 1, from, to, assist); // n -1 个盘子先挪到 A 柱子

    log(n, from, to); // 将第 n 个盘子从 F 移动到 T
    count++;

    count += hanoi(n - 1, assist, from, to); // n -1 个盘子从 A 柱子移动到 T 柱子
    return count;
  }

  return count;
}

const step = hanoi(3);
console.log('3 个盘子 总共需要步数: ', step);

// 可能的延伸
// 显示每一步后的柱子状态
// 添加动画效果
// 添加步骤验证（确保没有违反规则）
// 支持自定义柱子数量（不只是3个）

/*
  多柱汉诺塔（k个柱子，k≥4）
  柱子: 起始柱、目标柱、k-2个辅助柱
  策略: Frame-Stewart算法  (动态规划 + 递归）
  步数: 可以显著减少！

  移动n个盘子从起始柱到目标柱（有k个柱子可用）：

  1. 选择一个分割点 i (1 ≤ i < n)
  2. 移动最上面的 i 个盘子到某个辅助柱（使用所有k个柱子）
  3. 移动剩下的 n-i 个盘子到目标柱（只使用3个柱子：起始、目标、一个辅助）
  4. 移动那 i 个盘子从辅助柱到目标柱（使用所有k个柱子）

  实际应用场景
    - 数据中心迁移：多个临时存储位置
    - 任务调度：多个缓冲队列
    - 内存管理：多级缓存
    - 物流优化：多个中转站
*/


// ============================================
// 带动画效果的汉诺塔实现
// ============================================

/**
 * 汉诺塔状态类 - 用于管理三个柱子的状态
 */
class HanoiState {
  private towers: { [key: string]: number[] } = {
    F: [],
    A: [],
    T: []
  };
  private stepCount = 0;

  constructor(n: number) {
    // 初始化：所有盘子都在 F 柱上，从大到小排列
    for (let i = n; i >= 1; i--) {
      this.towers.F.push(i);
    }
  }

  /**
   * 移动盘子
   */
  move(from: string, to: string): void {
    const disk = this.towers[from].pop();
    if (disk !== undefined) {
      this.towers[to].push(disk);
      this.stepCount++;
    }
  }

  /**
   * 获取当前步数
   */
  getStepCount(): number {
    return this.stepCount;
  }

  /**
   * 可视化显示当前状态
   */
  display(from: string, to: string, diskNum: number): void {
    console.log('\n' + '='.repeat(50));
    console.log(`步骤 ${this.stepCount}: 移动盘子 ${diskNum} 从 ${from} → ${to}`);
    console.log('='.repeat(50));

    // 找出最高的柱子高度
    const maxHeight = Math.max(
      this.towers.F.length,
      this.towers.A.length,
      this.towers.T.length
    );

    // 从上到下打印每一层
    for (let level = maxHeight - 1; level >= 0; level--) {
      const f = this.towers.F[level] || 0;
      const a = this.towers.A[level] || 0;
      const t = this.towers.T[level] || 0;

      const fStr = f > 0 ? this.getDiskString(f) : '  |  ';
      const aStr = a > 0 ? this.getDiskString(a) : '  |  ';
      const tStr = t > 0 ? this.getDiskString(t) : '  |  ';

      console.log(`  ${fStr}    ${aStr}    ${tStr}`);
    }

    // 打印底座
    console.log('  -----    -----    -----');
    console.log('    F        A        T   ');
    console.log('');
  }

  /**
   * 根据盘子大小生成可视化字符串
   */
  private getDiskString(size: number): string {
    const diskChars = ['[1]', '[2]', '[3]', '[4]', '[5]', '[6]', '[7]', '[8]', '[9]'];
    return diskChars[size - 1] || `[${size}]`;
  }
}

/**
 * 带动画效果的汉诺塔求解器
 * @param n 盘子数量
 * @param delay 每步之间的延迟时间（毫秒）
 */
async function hanoiWithAnimation(n: number, delay: number = 500): Promise<void> {
  const state = new HanoiState(n);

  console.log('\n🎮 汉诺塔动画演示开始！');
  console.log(`📊 盘子数量: ${n}`);
  console.log(`⏱️  动画延迟: ${delay}ms\n`);

  // 显示初始状态
  console.log('📍 初始状态:');
  state.display('F', 'F', 0);

  // 等待一下让用户看清初始状态
  await sleep(delay * 2);

  /**
   * 递归移动函数
   */
  async function moveDisks(
    n: number,
    from: string,
    assist: string,
    to: string
  ): Promise<void> {
    if (n === 1) {
      // 基础情况：直接移动
      state.move(from, to);
      state.display(from, to, 1);
      await sleep(delay);
      return;
    }

    // 步骤1: 将 n-1 个盘子从 from 移到 assist（借助 to）
    await moveDisks(n - 1, from, to, assist);

    // 步骤2: 将第 n 个盘子从 from 移到 to
    state.move(from, to);
    state.display(from, to, n);
    await sleep(delay);

    // 步骤3: 将 n-1 个盘子从 assist 移到 to（借助 from）
    await moveDisks(n - 1, assist, from, to);
  }

  // 开始移动
  await moveDisks(n, 'F', 'A', 'T');

  // 显示完成信息
  console.log('\n' + '🎉'.repeat(25));
  console.log(`✅ 完成！总共移动了 ${state.getStepCount()} 步`);
  console.log(`📐 理论最少步数: ${Math.pow(2, n) - 1} 步`);
  console.log('🎉'.repeat(25) + '\n');
}

/**
 * 延迟函数
 */
function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

// ============================================
// 运行动画演示
// ============================================

console.log('\n\n' + '🌟'.repeat(30));
console.log('开始动画演示...');
console.log('🌟'.repeat(30));

// 运行 3 个盘子的动画演示，每步延迟 800ms
hanoiWithAnimation(3, 800).then(() => {
  console.log('动画演示结束！');
  console.log('\n💡 提示：你可以修改参数来尝试不同的效果：');
  console.log('   - hanoiWithAnimation(4, 500)  // 4个盘子，500ms延迟');
  console.log('   - hanoiWithAnimation(5, 300)  // 5个盘子，300ms延迟');
});