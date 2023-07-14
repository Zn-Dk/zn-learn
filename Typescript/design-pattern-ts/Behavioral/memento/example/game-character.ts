// 游戏角色信息
export interface ICharacterInfo {
  score: number;
  inventory: string[];
  level: number;
  location: { x: number; y: number; z: number };
}

// 角色: Originator
export class GameCharacter {
  state: ICharacterInfo;

  constructor(state?: ICharacterInfo) {
    this.state = {
      score: 0,
      inventory: [],
      level: 1,
      location: { x: 0, y: 0, z: 0 },
      ...state,
    };
  }

  get status() {
    return `Character Info: \n
    \tScore: ${this.state.score}
    \tLocation: ${this.state.location.x}, ${this.state.location.y}, ${this.state.location.z},
    \tInventory: ${[...this.state.inventory].join(', ')}
    \tLevel: ${this.state.level}`;
  }

  killAnEnemy() {
    this.state.score += 10;
  }

  killABoss() {
    this.state.score += 100;
  }

  move(x: number, y: number, z: number) {
    this.state.location.x += x;
    this.state.location.y += y;
    this.state.location.z += z;
  }

  passLevel() {
    this.state.level += 1;
  }

  grabItem(item: string) {
    this.state.inventory.push(item);
  }

  dropItem(item: string) {
    this.state.inventory.filter(i => i !== item);
  }
}
