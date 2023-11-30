interface ILeaderBoard {
  print(): string;
  addWinner(position: number, name: string): void;
}

export default class LeaderBoard implements ILeaderBoard {
  static instance: LeaderBoard;
  private table: { [position: number]: string } = {};

  constructor() {
    if (LeaderBoard.instance) {
      return LeaderBoard.instance;
    }

    LeaderBoard.instance = this;
  }

  print(): string {
    let content = '';
    for (const key in this.table) {
      content += `|\t${key}\t|\t${this.table[key]}\t|\n`;
    }

    return `------------- SCORE -------------\n${content}---------------------------------\n`;
  }

  addWinner(position: number, name: string): void {
    this.table[position] = name;
  }
}
