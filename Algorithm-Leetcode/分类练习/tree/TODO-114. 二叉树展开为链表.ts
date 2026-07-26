// 给你二叉树的根结点 root ，请你将它展开为一个单链表：

import type { TreeNode } from '../types'
import { createTreeNode, traverseTreeNode } from '../utils'

// 展开后的单链表应该 **同样使用** TreeNode ，其中 right 子指针指向链表中下一个结点，而左子指针始终为 null 。
// 展开后的单链表应该与二叉树 先序遍历 顺序相同。

// 输入：root = [1,2,5,3,4,null,6]
// 输出：[1,null,2,null,3,null,4,null,5,null,6]
// 示例 2：

// 输入：root = []
// 输出：[]
// 示例 3：

// 输入：root = [0]
// 输出：[0]

/**
 Do not return anything, modify root in-place instead.
 */
function flatten(root: TreeNode | null): void {
  let tail: TreeNode | null = null
  const restruct = (cur: TreeNode | null, next: TreeNode | null) => {
    if (!cur) return
    if (next) {
      if (!cur.left) {
        cur.right = next
        // 记录这个尾部
        tail = next
      } else {
        // 如果有右侧, 怎么接末端(tail)
        if (tail) {
          tail.right = cur.right
        }
        cur.right = cur.left // 左侧接过去
        // cur.left.right = next
        // cur.right = cur.left
      }
    }
    if (cur.left) {
      restruct(cur.left, cur.right)
      cur.right = cur.left
      cur.left = null
    }
  }

  restruct(root, null)
}

const root = createTreeNode([1, 2, 5, 3, 4, null, 6])
flatten(root)
const res = traverseTreeNode(root)
console.log('🚀 ~ res:', res)
