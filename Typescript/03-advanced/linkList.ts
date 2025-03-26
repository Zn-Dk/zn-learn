class LinkNode<T> {
  val: T;
  next: LinkNode<T> | null = null;

  constructor(val: T, next: LinkNode<T> | null = null) {
    this.val = val;
    this.next = next;
  }
}

class LinkList<T> {
  head: LinkNode<T> | null = null;

  constructor(initVal: T) {
    this.head = new LinkNode(initVal);
  }

  get tail(): LinkNode<T> | null {
    let tail = this.head;
    while (tail?.next) {
      tail = tail.next;
    }

    return tail;
  }

  append(val: T) {
    if (this.head === null) {
      this.head = new LinkNode(val);
    }

    let current = this.head;
    while (current.next) {
      current = current.next;
    }

    const node = new LinkNode(val);
    current.next = node;
    return node;
  }

  remove(node: LinkNode<T>) {
    if (this.head === null) {
      return false;
    }

    if (this.head === node) {
      this.head = null;
      return true;
    }

    let current = this.head;
    while (current.next && current.next !== node) {
      current = current.next;
    }

    current.next = null;
    return true;
  }

  entires(): LinkNode<T>[] {
    const nodes: LinkNode<T>[] = [];
    let current = this.head;
    if (current === null) return nodes;

    nodes.push(current);
    while (current.next) {
      current = current.next;
      nodes.push(current);
    }

    return nodes;
  }

  values(): T[] {
    const vals: T[] = [];
    let current = this.head;
    if (current === null) return vals;

    vals.push(current.val);
    while (current.next) {
      current = current.next;
      vals.push(current.val);
    }

    return vals;
  }

  [Symbol.iterator]() {
    let cur = this.head;
    return {
      next: () => {
        if (cur) {
          const ret = { value: cur.val, done: false };
          cur = cur.next;
          return ret;
        } else {
          return { value: undefined, done: true };
        }
      },
    };
  }
}

const list = new LinkList<number>(5);

list.append(1);
const n3 = list.append(3);
list.append(5);
list.append(2);

console.log(list);
console.log(list.head);
console.log(list.tail);
console.log(list.entires());
console.log([...list], 'iterator');
for (const iterator of list) {
  console.log(iterator, 'iterator');
}

console.log(list.values());
list.remove(n3);
console.log(list.values());
