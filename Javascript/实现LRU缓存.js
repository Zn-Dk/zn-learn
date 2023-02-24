/**
 * 运用你所掌握的数据结构，设计和实现一个  LRU (最近最少使用) 缓存机制 。实现 LRUCache 类：
 * 1. LRUCache(int capacity)
 *     以正整数作为容量 capacity 初始化 LRU 缓存
 * 2. int get(int key)
 *     如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
 * 3. void put(int key, int value)
 *     如果关键字已经存在，则变更其数据值；
 *     如果关键字不存在，则插入该组「关键字key-值value」。
 *     当缓存容量达到上限时，它应该在写入新数据之前删除最久未使用的数据值，从而为新的数据值留出空间。
 */

/** Class 数组-对象实现方式 */
class LRUCache {
  // 找到 key 所在 arr 位置, 如有, 剪切并插入到末尾(最新)
  static updateKey(keyArr, key) {
    if (keyArr.length) {
      const index = keyArr.indexOf(key);
      if (index > -1) {
        keyArr.push(...keyArr.splice(index, 1));
        return true;
      }
    }
    return false;
  }

  // 删除 key (如果已传入 index 直接使用 index 无需再查找)
  static removeKey(keyArr, key, index) {
    if (keyArr.length) {
      index = index ? index : keyArr.indexOf(key);
      index > -1 && keyArr.splice(index, 1);
    }
  }
  // removeCache
  static removeCache(cache, keys, key, keyIndex) {
    delete cache[key];
    LRUCache.removeKey(keys, key, keyIndex);
  }

  constructor(capacity = 3) {
    this.capacity = capacity;
    // 缓存对象
    this.cache = {};
    // 缓存对象 keys 数组, 保证顺序
    this.keys = [];
  }

  /**
   * 每次获取缓存的操作
   *  keys 数组存在元素 | 不存在返回 -1
   *    |-> updateKey 尝试取出更新数组 ->flag true 返回key对应的值 | false 返回 -1 。
   */
  get(key) {
    if (this.keys.length) {
      const flag = LRUCache.updateKey(this.keys, key);
      return flag ? this.cache[key] : -1;
    }
    return -1;
  }

  /**
   * 插入缓存的操作
   * 1.检查容量 大于容量清除旧缓存
   * 2.如果存在 则更新 value => 返回 updateKey 的结果(bol)
   * 3.如果不存在 则插入 key value
   */
  put(key, value) {
    if (this.keys.length >= this.capacity) {
      LRUCache.removeCache(this.cache, this.keys, this.keys[0], 0);
    }
    if (this.cache[key]) {
      this.cache[key] = value;
      return LRUCache.updateKey(this.keys, key);
    }
    this.keys.push(key);
    this.cache[key] = value;
    return true;
  }
}

const c = new LRUCache();
console.log(c.get("foo")); // -1
console.log(c.put("a", { a: 1 }));
console.log(c.put("b", ["b"]));
console.log(c.put("c", "c"));
console.log(c.get("a"), c.keys); // { a: 1 } , [ 'b', 'c', 'a' ] 将 a 取出时,数组也更新了
console.log(c.put("d", 4)); // b 作为最旧的缓存 被删去
console.log(c.cache); // { a: { a: 1 }, c: 'c', d: 4 }

console.log("------------------------------------");
/**  使用 Map 对象优化(Map 保证了插入顺序) */
class LRUCacheMap {
  constructor(capacity = 3) {
    this.capacity = capacity;
    // 缓存对象
    this.cache = new Map();
  }

  get(key) {
    if (this.cache.has(key)) {
      const value = this.cache.get(key);
      this.cache.delete(key);
      this.cache.set(key, value);
      return value;
    }
    return -1;
  }

  put(key, value) {
    if (this.cache.size >= this.capacity) {
      // keys()方法得到一个可遍历对象,执行next() 依次得到 map 对象的 key 值
      this.cache.delete(this.cache.keys().next().value);
    }
    // 如果有, 先删除 再插入
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }
    return !!this.cache.set(key, value);
  }
}

const d = new LRUCacheMap();
console.log(d.get("foo")); // -1
console.log(d.put("a", { a: 1 }));
console.log(d.put("b", ["b"]));
console.log(d.put("c", "c"));
console.log(d.get("a")); // { a: 1 }
console.log([...d.cache.entries()]); // [ [ 'b', [ 'b' ] ], [ 'c', 'c' ], [ 'a', { a: 1 } ] ]
console.log(d.put("d", 4)); // b 作为最旧的缓存 被删去
console.log([...d.cache.entries()]); // [ [ 'c', 'c' ], [ 'a', { a: 1 } ], [ 'd', 4 ] ]
