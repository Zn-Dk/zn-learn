// 规定取款调用的顺序
import { Dispenser } from './dispenser';

/** 初始化 ATM 调用链 */
export const initATMChain = () => {
  const chain1 = new Dispenser(100);
  const chain2 = new Dispenser(50);
  const chain3 = new Dispenser(20);
  const chain4 = new Dispenser(10);

  // 设置调用链以便程序运行 100 -> 50 -> 20 -> 10
  chain1.setSuccessor(chain2);
  chain2.setSuccessor(chain3);
  chain3.setSuccessor(chain4);

  // 返回调用链第一个处理器
  return chain1;
};
