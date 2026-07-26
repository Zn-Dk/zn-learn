/**
     * 给你两个 非空 的链表，表示两个非负的整数。它们每位数字都是按照 逆序 的方式存储的，并且每个节点只能存储 一位 数字。

    请你将两个数相加，并以相同形式返回一个表示和的链表。

    你可以假设除了数字 0 之外，这两个数都不会以 0 开头。



    示例 1：


    输入：l1 = [2,4,3], l2 = [5,6,4]
    输出：[7,0,8]
    解释：342 + 465 = 807.
    示例 2：

    输入：l1 = [0], l2 = [0]
    输出：[0]
    示例 3：

    输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
    输出：[8,9,9,9,0,0,0,1]

    **返回值**: ListNode | null (相加后的链表head)

    提示：

    每个链表中的节点数在范围 [1, 100] 内
    0 <= Node.val <= 9
    题目数据保证列表表示的数字不含前导零

 */

import { ListNode } from "../types"
import { traverseLinkList } from "../utils"

function addTwoNumbers(l1: ListNode | null, l2: ListNode | null): ListNode | null {
    let c1 = l1, c2 = l2
    /*
      dummy（哨兵节点）：一个值为 0 的假头节点，
      最终返回 dummy.next 就是真正的结果。
      这样就不用 if (!res) 来特判第一个节点了。
    */
    const dummy = new ListNode(0)
    let tail = dummy // 尾部
    let nextShift = false // 进位标识

    while (c1 !== null || c2 !== null) {
        // 当前两链表对应位相加值
        let c = (c1?.val || 0) + (c2?.val || 0)
        // 上次结果是否进位
        if (nextShift) {
            c += 1
            nextShift = false
        }

        if (c >= 10) {
            nextShift = true // 下一位要进位
            c -= 10
        }
        tail.next = new ListNode(c)
        tail = tail.next // 移动尾部

        c1 = c1?.next ?? null
        c2 = c2?.next ?? null
    }

    // 结束后, 如果还有进位符, 新增一个节点
    if (nextShift) {
        tail.next = new ListNode(1)
    }

    return dummy.next // dummy 是惰性节点, 直接取next
};

/**

输入：l1 = [2,4,3], l2 = [5,6,4]
输出：[7,0,8]
解释：342 + 465 = 807.
示例 2：

输入：l1 = [0], l2 = [0]
输出：[0]
示例 3：

输入：l1 = [9,9,9,9,9,9,9], l2 = [9,9,9,9]
输出：[8,9,9,9,0,0,0,1]
 */

// example1
const l1 = new ListNode(2, new ListNode(4, new ListNode(3)))
const l2 = new ListNode(5, new ListNode(6, new ListNode(4)))


console.log(traverseLinkList(addTwoNumbers(l1, l2)))

// example2
const l3 = new ListNode(0)
const l4 = new ListNode(0)

console.log(traverseLinkList(addTwoNumbers(l3, l4)))

// example3
const l5 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9)))))))
const l6 = new ListNode(9, new ListNode(9, new ListNode(9, new ListNode(9))))

console.log(traverseLinkList(addTwoNumbers(l5, l6)))
