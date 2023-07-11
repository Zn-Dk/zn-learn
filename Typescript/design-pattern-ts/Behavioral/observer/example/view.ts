// View - 实现 Observer
// 视图层 -> 观测 Model

import { IGraphDataModel } from './model';

export interface IGraphView {
  update(data: number[]): void;
  draw(data: number[]): void;
  remove(): void;
}

/** 柱状图 */
export class ColumnGraphView implements IGraphView {
  // 观测的 Model 主体
  #observableModel: IGraphDataModel;

  constructor(obsModel: IGraphDataModel) {
    this.#observableModel = obsModel;
    // 订阅 Model 数据变化，将 Model 数据变化通知给视图层，视图层绘制图层
    obsModel.subscribe(this);
  }

  // 接收 Model 数据变化通知 更新视图
  update(data: number[]) {
    console.log('ColumnGraphView drawing graph');
    this.draw(data);
  }

  draw(data: number[]) {
    data.forEach(amount => {
      console.log('⬜'.repeat(amount));
    });
  }

  remove() {
    this.#observableModel.unsubscribe(this);
  }
}

/** 饼图 */
export class PieGraphView implements IGraphView {
  // 观测的 Model 主体
  #observableModel: IGraphDataModel;

  constructor(obsModel: IGraphDataModel) {
    this.#observableModel = obsModel;
    // 订阅 Model 数据变化，将 Model 数据变化通知给视图层，视图层绘制图层
    obsModel.subscribe(this);
  }

  // 接收 Model 数据变化通知 更新视图
  update(data: number[]) {
    console.log('PieGraphView drawing graph');
    this.draw(data);
  }

  draw(data: number[]) {
    const total = data.reduce((acc, cur) => acc + cur, 0);
    data.forEach((amount, idx) => {
      console.log(`Pie index ${idx}: ${(amount / total) * 100}%'`);
    });
  }

  remove() {
    this.#observableModel.unsubscribe(this);
  }
}

/** 表格 */
export class TableGraphView implements IGraphView {
  // 观测的 Model 主体
  #observableModel: IGraphDataModel;

  constructor(obsModel: IGraphDataModel) {
    this.#observableModel = obsModel;
    // 订阅 Model 数据变化，将 Model 数据变化通知给视图层，视图层绘制图层
    obsModel.subscribe(this);
  }

  // 接收 Model 数据变化通知 更新视图
  update(data: number[]) {
    console.log('TableGraphView drawing graph');
    this.draw(data);
  }

  draw(data: number[]) {
    console.log('|   index\t|   amount\t|');
    data.forEach((amount, idx) => {
      console.log(`|\t${idx}\t|\t${amount}\t|`);
    });
  }

  remove() {
    this.#observableModel.unsubscribe(this);
  }
}
