// 定义一个 SortStrategy 接口
interface SortStrategy {
  sort(arr: number[]): number[];
}

// 实现一个 BubbleSort 类，它实现了 SortStrategy 接口
class BubbleSort implements SortStrategy {
  sort(arr: number[]): number[] {
    // 简化的冒泡排序实现
    const sortedArr = [...arr];
    const len = sortedArr.length;
    for (let i = 0; i < len; i++) {
      for (let j = 0; j < len - i - 1; j++) {
        if (sortedArr[j] > sortedArr[j + 1]) {
          [sortedArr[j], sortedArr[j + 1]] = [sortedArr[j + 1], sortedArr[j]];
        }
      }
    }
    return sortedArr;
  }
}

// 实现一个 QuickSort 类，它实现了 SortStrategy 接口
class QuickSort implements SortStrategy {
  sort(arr: number[]): number[] {
    // 简化的快速排序实现
    if (arr.length <= 1) {
      return arr;
    }
    const pivotIndex = Math.floor(arr.length / 2);
    const pivot = arr.splice(pivotIndex, 1)[0];
    const left: number[] = [];
    const right: number[] = [];
    for (const num of arr) {
      if (num < pivot) {
        left.push(num);
      } else {
        right.push(num);
      }
    }
    return this.sort(left).concat([pivot], this.sort(right));
  }
}

// 定义一个 Sorter 类，它依赖于 SortStrategy 接口
class Sorter {
  constructor(private sortStrategy: SortStrategy) {}

  sort(arr: number[]): number[] {
    return this.sortStrategy.sort(arr);
  }
}

// 使用策略模式创建 Sorter 实例
const bubbleSortStrategy = new BubbleSort();
const sorterWithBubbleSort = new Sorter(bubbleSortStrategy);
console.log(sorterWithBubbleSort.sort([5, 3, 1, 4, 2]));

const quickSortStrategy = new QuickSort();
const sorterWithQuickSort = new Sorter(quickSortStrategy);
console.log(sorterWithQuickSort.sort([5, 3, 1, 4, 2]));

/*
  在策略模式示例中，我们定义了一个SortStrategy接口，然后创建了两个实现了该接口的类：BubbleSort和QuickSort。
  接着，我们定义了一个Sorter类，它依赖于SortStrategy接口。
  通过将SortStrategy作为构造函数参数传递给Sorter，我们可以在运行时动态地为Sorter提供不同的排序实现。
  这样，我们可以轻松地在不修改Sorter代码的情况下切换排序算法。

  这个模式与 DI 依赖注入（Dependency Injection）有一定的相似性 , 但 DI 不属于传统的 23 种设计模式之一
*/
