/*
  反转链表 II
  给你单链表的头指针 head 和两个整数 left 和 right ，其中 left <= right 。
  请你反转从位置 left 到位置 right 的链表节点，返回 反转后的链表 。

  eg1
  输入：head = [1,2,3,4,5], left = 2, right = 4
  输出：[1,4,3,2,5]

  eg2
  输入：head = [5], left = 1, right = 1
  输出：[5]

    链表中节点数目为 n
    1 <= n <= 500
    -500 <= Node.val <= 500
    1 <= left <= right <= n
*/

import { ListNode } from "../types"
import { traverseLinkList } from "../utils"

const node1 = new ListNode(1)
const node2 = new ListNode(2)
const node3 = new ListNode(3)
const node4 = new ListNode(4)
const node5 = new ListNode(5)
node1.next = node2
node2.next = node3
node3.next = node4
node4.next = node5

// 头插法, 反转全链表
const fullReverse = (head: ListNode) => {
  let dummy: ListNode = new ListNode(-1) // dummy
  dummy.next = head;

  let start = head;
  let cur = head.next
  while (cur) {
      start.next = cur.next
      cur.next = dummy.next
      dummy.next = cur
      cur = start.next
  }
  return dummy.next
}
console.log(traverseLinkList(fullReverse(node1)));


// node3.next = node5
// console.log(traverseLinkList(node3));
// const newHead = reverseBetween(node3, 1, 2)
// console.log(traverseLinkList(newHead));

// 方法1: 自己想出的, 先找到边界, 再反转中间的节点, 最后拼接前后的节点
function reverseBetween(head: ListNode | null, left: number, right: number): ListNode | null {
  if (left === right) return head;
  let leftNode = null
  let leftPrev = null
  let rightNode = null
  let rightNext = null

  let cur = head
  let idx = 1
  // 先找到边界
  while (cur && rightNode === null) {
    if (idx === left - 1) leftPrev = cur
    if (idx === left) leftNode = cur
    if (idx === right) {
      rightNode = cur
      rightNext = cur?.next
    }
    cur = cur?.next
    idx++
  }
  // 判断是否无效边界
  if (!leftNode || !rightNode) return head;

  // 反转左右边界的节点
  let prev = leftNode // prev 为左边界
  cur = leftNode.next
  while (cur) {
    const next = cur?.next
    if (cur === rightNext) break;
    cur.next = prev
    prev = cur
    cur = next
  }
  // 拼接前后的节点
  leftNode.next = rightNext
  if (leftPrev) leftPrev.next = rightNode

  // 如果left=1，反转后rightNode成为新的head
  return leftPrev ? head : rightNode
};


// 方法2: dummy 虚拟头 (重点理解)
// 1-2-3-4-5
function reverseBetween2(head: ListNode | null, left: number, right: number): ListNode | null {
  if (!head || left === right) return head;

  const dummy = new ListNode(0); // 创建虚拟头节点
  dummy.next = head; // 并将虚拟头节点指向head
  let prev = dummy; // prev 初始为虚拟头节点

  // 定位到反转起始点的前一个节点 比如 left = 2 则定位到1
  for (let i = 1; i < left; i++) {
    prev = prev.next!;
  }

  const start = prev.next!; // start 为反转起始点 比如 left = 2 则 start 为2
  let curr = start.next;// curr 为反转第二个节点 比如 left = 2 则 curr 为3

  // 头插法反转(这里需要深入理解)
  // 头插法 的本质是：
  // - 保持一个固定的"起点"（start）
  // - 将后续的节点逐个 从原位置"拔"出来 ， 插入到已反转部分的最前面
  // - 就像排队时，每个人依次插到队伍的最前面，从而实现顺序反转

  // 反转right - left次  (2-3-4)  (4-3-2)
  for (let i = 0; i < right - left; i++) {
    // start 不移动, 每次的 curr 都插入到 prev 的 后面, 即反转最前头
    start.next = curr.next;     // 步骤1：2 → 4（2往后移动, 跳过3)
    curr.next = prev.next;      // 步骤2：3 → 2（3的next指向prev的next，即2, 与curr前后对调）
    prev.next = curr;           // 步骤3：1 → 3（prev的next指向3，3此时在反转最前头）
    curr = start.next;          // 步骤4：curr 移动到 4（准备下一次反转）
  }
  return dummy.next;
}
