// 121- 买卖股票的最佳时机 I
/*
    给定一个数组 prices ，它的第 i 个元素 prices[i] 表示一支给定股票第 i 天的价格。

    你只能选择 某一天 买入这只股票，并选择在 未来的某一个不同的日子 卖出该股票。设计一个算法来计算你所能获取的最大利润。

    返回你可以从这笔交易中获取的最大利润。如果你不能获取任何利润，返回 0 。

     

    示例 1：

    输入：[7,1,5,3,6,4]
    输出：5
    解释：在第 2 天（股票价格 = 1）的时候买入，在第 5 天（股票价格 = 6）的时候卖出，最大利润 = 6-1 = 5 。
        注意利润不能是 7-1 = 6, 因为卖出价格需要大于买入价格；同时，你不能在买入前卖出股票。
    示例 2：

    输入：prices = [7,6,4,3,1]
    输出：0
    解释：在这种情况下, 没有交易完成, 所以最大利润为 0。



*/

var maxProfit = function (prices) {
  let len = prices.length;
  let minPrice = prices[0],
    maxProfit = 0;
  for (let i = 1; i < len; i++) {
    // 记录【今天之前买入的最小值】
    minPrice = Math.min(minPrice, prices[i]);
    // 计算【在今天之前的某天(最小值)买入，今天卖出的获利】，也即【今天卖出的最大获利】
    // 比较【每天的最大获利】，取最大值即可
    maxProfit = Math.max(maxProfit, prices[i] - minPrice);
  }
  return maxProfit;
};

maxProfit([7, 1, 5, 3, 6, 4]);

// 122- 买卖股票的最佳时机 II
/*
  给你一个整数数组 prices ，其中 prices[i] 表示某支股票第 i 天的价格。
  在每一天，你可以决定是否购买和/或出售股票。你在任何时候 最多 只能持有 一股 股票。你也可以先购买，然后在 同一天 出售。
  返回 你能获得的 最大 利润 。

  题解: 贪心算法
  遍历整个股票交易日价格列表 price，策略是所有上涨交易日都买卖（赚到所有利润），所有下降交易日都不买卖（永不亏钱）。
  设 tmp 为第 i-1 日买入与第 i 日卖出赚取的利润，即 tmp = prices[i] - prices[i - 1] ；
  当该天利润为正 tmp > 0，则将利润加入总利润 profit；当利润为 00 或为负，则直接跳过；
  遍历完成后，返回总利润 profit。
*/
var maxProfit2 = function (prices) {
  // 贪心算法 因为可以同一天操作买卖 所以不停判断即可
  let ans = 0,
    profit = 0;
  for (let i = 1; i < prices.length; i++) {
    // 比较后一天是否有盈利 有的话累加利润
    profit = prices[i] - prices[i - 1];
    if (profit > 0) {
      ans += profit;
    }
  }
  return ans;
};
