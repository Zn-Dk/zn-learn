import { GraphController } from './controller';
import { GraphDataModel } from './model';
import { ColumnGraphView, PieGraphView, TableGraphView } from './view';

// model 层
const graphDataModel = new GraphDataModel([1, 2, 5, 6]);

// 新建一个Graph控制器
const graphController = new GraphController();
graphController.subscribe(graphDataModel);

// 三种Graph 视图层
const columnGraph = new ColumnGraphView(graphDataModel);
const pieGraph = new PieGraphView(graphDataModel);
const tableGraph = new TableGraphView(graphDataModel);

// controller 的 notify 方法操作 model 层带动 view 变化
graphController.notify();
/*
  ColumnGraphView drawing graph
  ⬜
  ⬜⬜
  ⬜⬜⬜⬜⬜
  ⬜⬜⬜⬜⬜⬜

  PieGraphView drawing graph
  Pie index 0: 7.142857142857142%'
  Pie index 1: 14.285714285714285%'
  Pie index 2: 35.714285714285715%'
  Pie index 3: 42.857142857142854%'

  TableGraphView drawing graph
  |   index       |   amount      |
  |       0       |       1       |
  |       1       |       2       |
  |       2       |       5       |
  |       3       |       6       |

*/

pieGraph.remove(); // 去除订阅

// pieGraph.draw([1, 2, 1]); // 这种是不符合原则的

graphController.notify([3, 5, 6, 8]); // 再发布, pieGraphView 已经不更新
/*
  ColumnGraphView drawing graph
  ⬜⬜⬜
  ⬜⬜⬜⬜⬜
  ⬜⬜⬜⬜⬜⬜
  ⬜⬜⬜⬜⬜⬜⬜⬜

  TableGraphView drawing graph
  |   index       |   amount      |
  |       0       |       3       |
  |       1       |       5       |
  |       2       |       6       |
  |       3       |       8       |
*/
