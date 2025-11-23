/**
 * 汉诺塔问题 - 性能优化方法集合
 *
 * 经典汉诺塔问题的时间复杂度是 O(2^n)，这是由问题本质决定的。
 * 但我们可以通过不同的实现方式来优化：
 * 1. 减少函数调用开销
 * 2. 减少 I/O 操作
 * 3. 利用数学规律
 * 4. 优化内存使用
 */

// ============================================
// 方法1: 迭代法（非递归实现）
// ============================================
/**
 * 迭代法求解汉诺塔
 *
 * 优化点：
 * - 避免递归调用的栈开销
 * - 使用循环代替递归
 * - 适合 n 较大的情况
 *
 * 原理：
 * - 盘子编号为奇数时，按顺时针方向移动（F→T→A→F）
 * - 盘子编号为偶数时，按逆时针方向移动（F→A→T→F）
 * - 总是移动最小的合法盘子
 *
 * 时间复杂度：O(2^n)
 * 空间复杂度：O(n) - 只需要存储三个栈
 */
interface Tower {
  name: string;
  disks: number[];
}

function hanoiIterative(n: number, printSteps: boolean = false): number {
  // 初始化三个柱子
  const towers: Tower[] = [
    { name: 'F', disks: [] },
    { name: 'A', disks: [] },
    { name: 'T', disks: [] }
  ];

  // 将所有盘子放在第一个柱子上
  for (let i = n; i >= 1; i--) {
    towers[0].disks.push(i);
  }

  // 计算总步数
  const totalSteps = Math.pow(2, n) - 1;
  let stepCount = 0;

  // 确定移动方向（n为奇数和偶数时方向不同）
  const isOdd = n % 2 === 1;

  // 定义三个柱子的索引顺序
  // n为奇数：F(0) → T(2) → A(1) → F(0)
  // n为偶数：F(0) → A(1) → T(2) → F(0)
  const order = isOdd ? [0, 2, 1] : [0, 1, 2];

  for (let i = 1; i <= totalSteps; i++) {
    if (i % 2 === 1) {
      // 奇数步：移动最小的盘子
      moveDisk(towers, order[0], order[1], printSteps);
    } else {
      // 偶数步：在另外两个柱子之间进行唯一合法的移动
      const from = order[1];
      const to = order[2];

      if (canMove(towers[from], towers[to])) {
        moveDisk(towers, from, to, printSteps);
      } else {
        moveDisk(towers, to, from, printSteps);
      }
    }
    stepCount++;

    // 更新顺序（循环移动）
    if (i % 2 === 1) {
      const temp = order[0];
      order[0] = order[1];
      order[1] = order[2];
      order[2] = temp;
    }
  }

  return stepCount;
}

function canMove(from: Tower, to: Tower): boolean {
  if (from.disks.length === 0) return false;
  if (to.disks.length === 0) return true;
  return from.disks[from.disks.length - 1] < to.disks[to.disks.length - 1];
}

function moveDisk(towers: Tower[], fromIdx: number, toIdx: number, print: boolean): void {
  const from = towers[fromIdx];
  const to = towers[toIdx];

  if (from.disks.length > 0) {
    const disk = from.disks.pop()!;
    to.disks.push(disk);

    if (print) {
      console.log(`移动盘子 ${disk}: ${from.name} → ${to.name}`);
    }
  }
}

// ============================================
// 方法2: 位运算优化法
// ============================================
/**
 * 利用二进制特性优化汉诺塔
 *
 * 优化点：
 * - 利用格雷码（Gray Code）的性质
 * - 每一步的移动可以通过位运算快速计算
 * - 避免递归调用
 *
 * 原理：
 * - 第 i 步移动的盘子编号 = i 的二进制表示中最低位的 1 的位置
 * - 移动方向可以通过位运算确定
 *
 * 时间复杂度：O(2^n)
 * 空间复杂度：O(1)
 */
function hanoiBitwise(n: number, printSteps: boolean = false): number {
  const totalSteps = (1 << n) - 1; // 2^n - 1
  const towers = ['F', 'A', 'T'];

  for (let step = 1; step <= totalSteps; step++) {
    // 找出当前步骤要移动的盘子（最低位的1）
    const disk = (step & -step);
    const diskNumber = Math.log2(disk) + 1;

    // 计算源柱子和目标柱子
    // 使用格雷码的性质
    const from = getSourceTower(step - 1, n);
    const to = getSourceTower(step, n);

    if (printSteps) {
      console.log(`步骤 ${step}: 移动盘子 ${diskNumber} 从 ${towers[from]} 到 ${towers[to]}`);
    }
  }

  return totalSteps;
}

function getSourceTower(step: number, n: number): number {
  // 使用格雷码计算当前盘子所在的柱子
  let gray = step ^ (step >> 1);
  let sum = 0;

  for (let i = 0; i < n; i++) {
    sum += (gray >> i) & 1;
  }

  return sum % 3;
}

// ============================================
// 方法3: 只计算步数（最快）
// ============================================
/**
 * 只计算步数，不执行实际移动
 *
 * 优化点：
 * - 完全避免 I/O 操作
 * - 使用数学公式直接计算
 * - 最快的实现方式
 *
 * 时间复杂度：O(1)
 * 空间复杂度：O(1)
 */
function hanoiCountOnly(n: number): number {
  // 汉诺塔的最少步数公式：2^n - 1
  return Math.pow(2, n) - 1;
}

// 使用位运算版本（更快）
function hanoiCountOnlyFast(n: number): number {
  return (1 << n) - 1; // 2^n - 1
}

// ============================================
// 方法4: 批量操作优化
// ============================================
/**
 * 批量操作优化
 *
 * 优化点：
 * - 将多个小操作合并为一个大操作
 * - 减少函数调用次数
 * - 使用尾递归优化
 *
 * 适用场景：需要输出步骤但希望减少函数调用开销
 */
interface Move {
  disk: number;
  from: string;
  to: string;
}

function hanoiBatch(n: number): Move[] {
  const moves: Move[] = [];

  function collect(n: number, from: string, assist: string, to: string): void {
    if (n === 1) {
      moves.push({ disk: 1, from, to });
      return;
    }

    collect(n - 1, from, to, assist);
    moves.push({ disk: n, from, to });
    collect(n - 1, assist, from, to);
  }

  collect(n, 'F', 'A', 'T');
  return moves;
}

// 批量输出（减少 I/O 次数）
function hanoiBatchPrint(n: number): number {
  const moves = hanoiBatch(n);

  // 一次性构建所有输出字符串
  const output = moves.map((move, index) =>
    `步骤 ${index + 1}: 移动盘子 ${move.disk} 从 ${move.from} 到 ${move.to}`
  ).join('\n');

  console.log(output);
  return moves.length;
}

// ============================================
// 方法5: 记忆化递归（适用于重复计算场景）
// ============================================
/**
 * 记忆化递归
 *
 * 优化点：
 * - 缓存已计算的结果
 * - 避免重复计算
 *
 * 适用场景：
 * - 需要多次查询不同 n 值的步数
 * - 需要计算多个汉诺塔问题
 *
 * 注意：对于单次计算，这个方法反而会更慢
 */
const memoCache = new Map<string, number>();

function hanoiMemoized(n: number, from = 'F', assist = 'A', to = 'T'): number {
  // 创建缓存键
  const key = `${n}-${from}-${assist}-${to}`;

  // 检查缓存
  if (memoCache.has(key)) {
    return memoCache.get(key)!;
  }

  // 基础情况
  if (n === 1) {
    return 1;
  }

  // 递归计算
  const steps =
    hanoiMemoized(n - 1, from, to, assist) +
    1 +
    hanoiMemoized(n - 1, assist, from, to);

  // 存入缓存
  memoCache.set(key, steps);

  return steps;
}

// ============================================
// 方法6: 尾递归优化（理论优化）
// ============================================
/**
 * 尾递归优化版本
 *
 * 优化点：
 * - 使用尾递归形式
 * - 在支持尾调用优化的环境中可以减少栈空间
 *
 * 注意：JavaScript/TypeScript 的大多数引擎不支持尾调用优化
 * 但这是一种良好的编程实践
 */
function hanoiTailRecursive(
  n: number,
  from = 'F',
  assist = 'A',
  to = 'T',
  moves: Move[] = []
): Move[] {
  if (n === 0) {
    return moves;
  }

  if (n === 1) {
    moves.push({ disk: 1, from, to });
    return moves;
  }

  // 移动 n-1 个盘子到辅助柱
  hanoiTailRecursive(n - 1, from, to, assist, moves);

  // 移动第 n 个盘子到目标柱
  moves.push({ disk: n, from, to });

  // 移动 n-1 个盘子到目标柱
  hanoiTailRecursive(n - 1, assist, from, to, moves);

  return moves;
}

// ============================================
// 性能测试工具
// ============================================
/**
 * 性能测试函数
 */
function performanceTest(n: number): void {
  console.log(`\n${'='.repeat(60)}`);
  console.log(`汉诺塔性能测试 (n = ${n})`);
  console.log('='.repeat(60));

  const tests = [
    { name: '方法1: 迭代法', fn: () => hanoiIterative(n, false) },
    { name: '方法2: 位运算法', fn: () => hanoiBitwise(n, false) },
    { name: '方法3: 只计算步数', fn: () => hanoiCountOnly(n) },
    { name: '方法4: 批量操作', fn: () => hanoiBatch(n).length },
    { name: '方法5: 记忆化递归', fn: () => hanoiMemoized(n) },
    { name: '方法6: 尾递归', fn: () => hanoiTailRecursive(n).length }
  ];

  tests.forEach(test => {
    const startTime = performance.now();
    const result = test.fn();
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(4);

    console.log(`${test.name.padEnd(25)} | 步数: ${result} | 耗时: ${duration}ms`);
  });

  console.log('='.repeat(60));
}

// ============================================
// 使用示例和性能对比
// ============================================
function runExamples(): void {
  console.log('\n🎯 汉诺塔性能优化方法演示\n');

  // 示例1: 小规模测试（n=3）
  console.log('📊 示例1: 小规模测试 (n=3)');
  console.log('-'.repeat(40));
  console.log('迭代法:');
  hanoiIterative(3, true);

  // 示例2: 中等规模性能测试
  console.log('\n📊 示例2: 中等规模性能测试');
  performanceTest(15);

  // 示例3: 大规模性能测试（只测试不输出的方法）
  console.log('\n📊 示例3: 大规模性能测试 (n=25)');
  console.log('-'.repeat(40));

  const n = 25;
  const tests = [
    { name: '只计算步数（公式）', fn: () => hanoiCountOnly(n) },
    { name: '只计算步数（位运算）', fn: () => hanoiCountOnlyFast(n) }
  ];

  tests.forEach(test => {
    const startTime = performance.now();
    const result = test.fn();
    const endTime = performance.now();
    const duration = (endTime - startTime).toFixed(6);

    console.log(`${test.name.padEnd(25)} | 步数: ${result.toLocaleString()} | 耗时: ${duration}ms`);
  });

  // 示例4: 批量操作演示
  console.log('\n📊 示例4: 批量操作演示 (n=4)');
  console.log('-'.repeat(40));
  const moves = hanoiBatch(4);
  console.log(`生成了 ${moves.length} 个移动步骤`);
  console.log('前5步:');
  moves.slice(0, 5).forEach((move, i) => {
    console.log(`  ${i + 1}. 盘子 ${move.disk}: ${move.from} → ${move.to}`);
  });

  // 性能优化建议
  console.log('\n💡 性能优化建议:');
  console.log('='.repeat(60));
  console.log('1. 只需要步数：使用方法3（公式法），O(1) 时间复杂度');
  console.log('2. 需要输出步骤且 n 较小：使用方法4（批量操作）');
  console.log('3. 需要输出步骤且 n 较大：使用方法1（迭代法）');
  console.log('4. 需要多次查询：使用方法5（记忆化递归）');
  console.log('5. 避免使用：传统递归 + 实时输出（最慢）');
  console.log('='.repeat(60));

  // 复杂度对比
  console.log('\n📈 时间复杂度对比:');
  console.log('='.repeat(60));
  console.log('方法1 (迭代法):        O(2^n) - 无递归开销');
  console.log('方法2 (位运算):        O(2^n) - 计算开销较小');
  console.log('方法3 (公式法):        O(1)   - 最快');
  console.log('方法4 (批量操作):      O(2^n) - 减少 I/O 次数');
  console.log('方法5 (记忆化):        O(2^n) - 首次，O(1) 后续');
  console.log('方法6 (尾递归):        O(2^n) - 理论优化');
  console.log('传统递归 + 实时输出:   O(2^n) - 最慢（I/O 开销大）');
  console.log('='.repeat(60));
}

// ============================================
// 运行演示
// ============================================
runExamples();

// 导出所有方法供外部使用
export {
  hanoiIterative,
  hanoiBitwise,
  hanoiCountOnly,
  hanoiCountOnlyFast,
  hanoiBatch,
  hanoiBatchPrint,
  hanoiMemoized,
  hanoiTailRecursive,
  performanceTest
};
