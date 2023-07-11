import { GameEngine } from './game-engine';
import { Logger } from './logger';
import { GameUser, IUser } from './user';

// 将子类进行 API 封装
export class GameApi {
  private gameEngine!: GameEngine;
  private user!: GameUser;
  private logger!: Logger;
  private loggerDb = [];
  private userDb = {};

  constructor() {
    this.init();
  }

  private init() {
    this.logger = new Logger(this.loggerDb);
    this.user = new GameUser(this.userDb, this.logger);
    this.gameEngine = new GameEngine(this.logger);
  }

  gameState() {
    this.gameEngine.getGameState();
  }

  draw(ctx: any) {
    this.gameEngine.draw(ctx);
  }

  createUser(user: IUser) {
    this.user.create(user);
  }

  logHistory() {
    return this.logger.history();
  }
}
