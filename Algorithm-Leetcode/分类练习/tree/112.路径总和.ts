/**
给你二叉树的根节点 root 和一个表示目标和的整数 targetSum 。
判断该树中是否存在 根节点到叶子节点 的路径，这条路径上所有节点值相加等于目标和 targetSum 。
如果存在，返回 true ；否则，返回 false 。
叶子节点 是指没有子节点的节点。

提示：

树中节点的数目在范围 [0, 5000] 内
-1000 <= Node.val <= 1000
-1000 <= targetSum <= 1000

 */

import type { TreeNode } from '../types'
import { createTreeNode } from '../utils'

const tree1 = createTreeNode([5, 4, 8, 11, null, 13, 4, 7, 2, null, null, null, 1])

// 一定是root->leaf 不能中间节点

// 实现1, 无提前终止
// function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
//   if (!root) return false

//   let hasSum = false
//   const diveIn = (node: TreeNode, prevSum = 0) => {
//     if (node?.left) {
//       diveIn(node.left, prevSum + node.val)
//     }
//     if (node?.right) {
//       diveIn(node.right, prevSum + node.val)
//     }
//     // leaf
//     if (!node?.left && !node?.right) {
//       const isCurPathMatch = prevSum + node.val === targetSum
//       if (isCurPathMatch && !hasSum) {
//         hasSum = true
//       }
//     }
//   }

//   diveIn(root)
//   return hasSum
// }

// 推荐
function hasPathSum(root: TreeNode | null, targetSum: number): boolean {
  if (!root) return false
  if (!root.left && !root.right) {
    return root.val === targetSum
  }
  
  const rest = targetSum - root.val // 直接用剩余递归
  const leftMatch = hasPathSum(root.left, rest)
  const rightMatch = hasPathSum(root.right, rest)
  return leftMatch || rightMatch // 短路可提前终止
}
console.log(hasPathSum(tree1, 22))
console.log(hasPathSum(createTreeNode([1]), 1))
