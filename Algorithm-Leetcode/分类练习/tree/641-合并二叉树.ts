import { TreeNode } from "../types";
import { createTreeNode, traverseTreeNode } from "../utils";
/*
  合并两二叉树

  想象一下，当你将其中一棵覆盖到另一棵之上时，两棵树上的一些节点将会重叠（而另一些不会）。你需要将这两棵树合并成一棵新二叉树。合并的规则是：如果两个节点重叠，那么将这两个节点的值相加作为合并后节点的新值；否则，不为 null 的节点将直接作为新二叉树的节点。
  返回合并后的二叉树。
  注意: 合并过程必须从两个树的根节点开始。

  输入：root1 = [1,3,2,5], root2 = [2,1,3,null,4,null,7]
  输出：[3,4,5,5,4,null,7]
  输入：root1 = [1], root2 = [1,2]
  输出：[2,2]

    提示：

    两棵树中的节点数目在范围 [0, 2000] 内
    -10^4 <= Node.val <= 10^4
  */


// ======================= 递归初版, 直接创建 new TreeNode, 传递引用 =======================

function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1 && !root2) return null;

  const recurMerge = (merge: TreeNode | null, root1: TreeNode | null, root2: TreeNode | null) => {
    if (!root1 && !root2) {
      merge = null
      return;
    };

    merge.val += (root1?.val || 0)
    merge.val += (root2?.val || 0)
    if (!merge?.left && (root1?.left || root2?.left)) {
      merge.left = new TreeNode()
    }
    if (!merge?.right && (root1?.right || root2?.right)) {
      merge.right = new TreeNode()
    }
    recurMerge(merge?.left, root1?.left, root2?.left ?? null)
    recurMerge(merge?.right, root1?.right, root2?.right ?? null)
  }

  let mergeRoot = new TreeNode()
  recurMerge(mergeRoot, root1, root2)
  return mergeRoot;
}

// ======================= 递归实现正解 =======================

function mergeTreesDfs(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1 && !root2) return null;
  if (!root1) return root2;
  if (!root2) return root1;
  // 当前节点 root1/2 都存在时 以 root1 为基准, 最后也返回 root1 的结果
  root1.val += root2.val
  // 递归处理 l/r
  root1.left = mergeTreesDfs(root1.left, root2.left)
  root1.right = mergeTreesDfs(root1.right, root2.right)
  return root1;
}

// ======================= 迭代实现初版, 错误 =======================
// function mergeTrees(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
//   const queue = [root2];
//   const newRoot = root1;
//   let cur = newRoot;
//   // BFS 法, 需要同时追踪 newRoot 和 cur (先暂时放弃)
//   while (queue.length) {
//     const other = queue.shift();
//     if (!other) continue;
//     const otherLeft = other?.left;
//     const otherRight = other?.right;

//     // 当前节点的值相加
//     cur.val += other?.val ?? 0;

//     // 下游节点的值相加
//     if (!cur.left && otherLeft) {
//       cur.left = otherLeft;
//     } else if (cur.left && otherLeft) {
//       cur.left.val += otherLeft.val;
//     }

//     if (!cur.right && otherRight) {
//       cur.right = otherRight;
//     } else if (cur.right && otherRight) {
//       cur.right.val += otherRight.val;
//     }

//     queue.push(otherLeft);
//     queue.push(otherRight);
//   }

//   return newRoot;
// }

// ======================= 迭代实现 BFS =======================
function mergeTreesBfs(root1: TreeNode | null, root2: TreeNode | null): TreeNode | null {
  if (!root1 || !root2) {
    return !root1 ? root2 : root1
  }

  const queue = [root1, root2];

  while (queue.length) {
    // 进入队列的 node 一定存在
    let node1 = queue.shift()!;
    let node2 = queue.shift()!;

    node1.val += node2.val; // 始终 2 -> 1

    // 处理左节点
    if (node1.left && node2.left) { // 都存在时 推入队列进行累加
      queue.push(node1.left, node2.left);
    } else if (!node1.left) { // 如果一边不存在, 直接赋值为另一边
      node1.left = node2.left
    }

    // 处理右节点 逻辑同理
    if (node1.right && node2.right) {
      queue.push(node1.right, node2.right);
    } else if (!node1.right) {
      node1.right = node2.right
    }
  }

  return root1;
}

const root1 = createTreeNode([1,3,2,5]);
const root2 = createTreeNode([2,1,3,null,4,null,7]);
// [ 3, 4, 5, 5, 4, null, 7 ] <- target


// const res = mergeTrees(root1, root2);

// const res = mergeTreesDfs(root1, root2);
// console.log(traverseTreeNode(res));

const res2 = mergeTreesBfs(root1, root2);
console.log(traverseTreeNode(res2));
