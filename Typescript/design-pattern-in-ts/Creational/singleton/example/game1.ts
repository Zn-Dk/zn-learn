import LeaderBoard from './leaderboard';
import { IGame } from './types';

export class Game1 implements IGame {
  leaderBoard: LeaderBoard;

  constructor() {
    // 开始一局游戏 并初始化 LeaderBoard ( 检查是否已经创建了排名板实例 )
    this.leaderBoard = new LeaderBoard();
  }

  addWinner(position: number, name: string): void {
    this.leaderBoard.addWinner(position, name);
  }
}
