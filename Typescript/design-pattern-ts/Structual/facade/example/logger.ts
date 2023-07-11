export class Logger {
  db: any[] = [];

  constructor(db: any[]) {
    this.db = db;
  }

  log(message: string) {
    this.db.push(`[LOG]: ${message}`);
    console.log(message);
  }

  error(message: string) {
    this.db.push(`[ERROR]: ${message}`);
    console.error(message);
  }

  history() {
    return this.db.join('\n');
  }
}
