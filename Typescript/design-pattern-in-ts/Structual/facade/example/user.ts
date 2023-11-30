import { Logger } from './logger';

export interface IUser {
  id?: number;
  name: string;
  email: string;
  password: string;
  isAdmin?: boolean;
  isBanned?: boolean;
  isDeleted?: boolean;
}

export class GameUser {
  db: any = {};
  logger: Logger;

  constructor(db: any, logger: Logger) {
    this.db = db;
    this.logger = logger;
  }

  create(user: IUser) {
    const dataId = Math.random().toString(16).slice(-6);
    this.db[dataId] = {
      ...user,
      id: dataId,
    };
    this.logger.log(`[User] create user with id: ${dataId}`);
  }

  findUserById(id: string) {
    return this.db[id];
  }

  updateUserById(id: string, data: IUser) {
    const origin = this.db[id];
    if (!origin) return;

    this.db[id] = {
      ...origin,
      ...data,
    };
    this.logger.log(`[User updated] create user with id: ${id}`);
  }

  deleteUserById(id: string) {
    const origin = this.db[id];
    if (!origin) return;

    Reflect.deleteProperty(this.db, id);
    this.logger.log(`[User deleted] deleted user with id: ${id}`);
  }
}
