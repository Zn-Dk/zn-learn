import { Logger } from './logger';

export class GameEngine {
  db: any[] = [];
  logger: Logger;

  constructor(logger: Logger) {
    this.logger = logger;
  }

  draw(ctx: any) {
    this.db.push(ctx);
    this.logger.log(`draw object ${ctx}`);
  }

  getGameState() {
    this.logger.log('Now rendering ' + this.db.length + ' objects: ' + this.db.join(', '));
  }

  stop() {
    this.logger.log('Stopping game engine');
  }
}
