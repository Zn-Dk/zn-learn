/**
给定二叉树的根节点 root ，返回所有左叶子之和。


示例 1：

输入: root = [3,9,20,null,null,15,7]
输出: 24
解释: 在这个二叉树中，有两个左叶子，分别是 9 和 15，所以返回 24
示例 2:

输入: root = [1]
输出: 0

};
 *
 */

import type { TreeNode } from '../types'
import { createTreeNode } from '../utils'

const tree1 = createTreeNode([3, 9, 20, null, null, 15, 7])
const tree2 = createTreeNode([1])
const tree3 = createTreeNode([1, 2])

// 实现1, 排除右
// 这种"排除法"的思路过于绕弯，且语义不清晰。正确的做法应该是在父节点判断子节点是否为"左叶子"。
// function sumOfLeftLeaves(root: TreeNode | null): number {
//   if (!root) return 0
//   if (!root.left && !root.right) return 0

//   let leftSum = 0
//   const process = (node: TreeNode) => {
//     if (node.left) {
//       process(node.left)
//     }
//     // 如果是右侧, 则不能是右叶
//     const nextRightisLeaf = !node.right?.left && !node.right?.right
//     if (!nextRightisLeaf) {
//       process(node.right!)
//     }

//     if (!node.left && !node.right) {
//       leftSum += node.val
//     }
//   }
//   process(root)
//   return leftSum
// }

// 推荐, 判断左叶子节点时, 相加并递归返回
function sumOfLeftLeaves(root: TreeNode | null): number {
  if (!root) return 0
  if (!root.left && !root.right) return 0

  let sum = 0
  // 是否左叶
  if (root.left && !root.left.left && !root.left.right) {
    sum += root.left.val
  } else {
    sum += sumOfLeftLeaves(root.left)
  }
  sum += sumOfLeftLeaves(root.right)

  return sum
}

console.log(sumOfLeftLeaves(tree1)) //24
console.log(sumOfLeftLeaves(tree2)) // 0
console.log(sumOfLeftLeaves(tree3)) // 2
