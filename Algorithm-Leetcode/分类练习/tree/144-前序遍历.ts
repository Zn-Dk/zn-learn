/**  给你二叉树的根节点 root ，返回它节点值的 前序 遍历。 */

import type {TreeNode} from '../types';
import {createTreeNode} from '../utils';

// 输入：root = [1,null,2,3]
// 输出：[1,2,3]

// 输入：root = [1,2,3,4,5,null,8,null,null,6,7,9]
// 输出：[1,2,4,5,6,7,3,8,9]

function preorderTraversal(root: TreeNode | null): number[] {
  const res: number[] = [];
  const record = (node: TreeNode | null) => {
    if (node) {
      res.push(node.val);
      record(node?.left); // 从左节点进入
      record(node?.right);
    }
  };
  record(root);
  return res;
}

const root = createTreeNode([1, null, 2, 3]);
const root2 = createTreeNode([1, 2, 3, 4, 5, null, 8, null, null, 6, 7, 9]);

console.log(preorderTraversal(root2));
