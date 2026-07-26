// 给定一个二叉树，找出其最小深度。

import type { TreeNode } from '../types'
import { createTreeNode } from '../utils'

// 最小深度是从根节点到最近叶子节点的最短路径上的节点数量。

function minDepthBfs(root: TreeNode | null): number {
  if (!root) return 0
  const queue: [TreeNode, number][] = [[root, 1]]
  
  while (queue.length) {
    const [cur, depth] = queue.shift()!
    if (!cur.left && !cur.right) return depth // 先到达叶子的直接返回
    cur.left && queue.push([cur.left, depth + 1]) // 当前 + 1
    cur.right && queue.push([cur.right, depth + 1])
  }
  return 0
}

// 这个方法更经典
function minDepthBfs2(root: TreeNode | null): number {
  if (!root) return 0
  const queue: TreeNode[] = [root]
  let depth = 0

  while (queue.length) {
    depth++
    const size = queue.length 
    // 可以扩展为"按层收集结果"等变体
    for (let i = 0; i < size; i++) {
      const cur = queue.shift()!
      if (!cur.left && !cur.right) return depth
      cur.left && queue.push(cur.left)
      cur.right && queue.push(cur.right)
    }
  }
  return 0
}

// recur
function minDepthDfs(root: TreeNode | null): number {
  if (!root) return 0
  if (!root.left) return minDepthDfs(root.right) + 1
  if (!root.right) return minDepthDfs(root.left) + 1
  return Math.min(minDepthDfs(root.left), minDepthDfs(root.right)) + 1
}

const root1 = createTreeNode([3, 9, 20, null, null, 15, 7])
const root2 = createTreeNode([2, null, 3, null, 4, null, 5, null, 6])

console.log(minDepthDfs(root1), minDepthDfs(root2))

console.log(minDepthBfs(root1), minDepthBfs(root2))
