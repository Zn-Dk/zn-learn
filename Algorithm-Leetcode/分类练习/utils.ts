import { TreeNode, type ListNode } from "./types"

// #region ---------------------------- LinkList ----------------------------

export const traverseLinkList = (head: ListNode | null): number[] => {
    if (!head) return []
    const res: number[] = []
    let c: ListNode | null = head
    while (c !== null) {
        res.push(c.val)
        c = c.next
    }
    return res
}

// #endregion ---------------------------- LinkList ----------------------------

export const createTreeNode = (nodes: (number | null)[]): TreeNode | null => {
  if (nodes.length === 0 || nodes[0] === null) return null
  const root = new TreeNode(nodes[0]);
  const queue = [root];
  let i = 1;
  while (queue.length && i < nodes.length) {
    const cur = queue.shift()!;

    if (i < nodes.length && nodes[i] !== null) {
      cur.left = new TreeNode(nodes[i]!);
      queue.push(cur.left);
    }
    i++; // 无论是否为 null 都要递增

    if (i < nodes.length && nodes[i] !== null) {
      cur.right = new TreeNode(nodes[i]!);
      queue.push(cur.right);
    }
    i++;
  }

  return root;
};

export const traverseTreeNode = (root: TreeNode | null):(number | null)[] => {
  if (!root) return [];
  const queue: (TreeNode | null)[] = [root];
  const res: (number | null)[] = [];
  while (queue.length) {
    const cur = queue.shift()!;
    if (cur === null) {
      res.push(null)
      // 当 cur 是一个叶子节点（没有子节点）时，cur.left 和 cur.right 都是 null（或 undefined），但它们仍然被 push 进了队列。
      // 这会导致队列结尾出现连续的 null，最终需要裁剪掉。
    } else {
      res.push(cur.val);
      queue.push(cur.left);
      queue.push(cur.right);
    }
  }

  // 裁剪末尾的 null
  while (res[res.length - 1] === null) {
    res.pop()
  }

  return res;
};

// root1 [1,3,2,5]
// root2 [2,1,3,null,4,null,7]

// const root1 = createTreeNode([1, 3, 2, 5]);
// const root2 = createTreeNode([2, 1, 3, null, 4, null, 7]);

// console.log(traverseTreeNode(root1));
// console.log(traverseTreeNode(root2));
