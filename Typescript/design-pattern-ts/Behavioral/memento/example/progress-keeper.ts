import { GameCharacter } from './game-character';
import { GameSave } from './game-save';

const deepClone = (data: any) => JSON.parse(JSON.stringify(data));
// 角色 CareTaker
export class GameProgressKeeper {
  saves: GameSave[];
  game: GameCharacter;

  constructor(gameCharacter: GameCharacter) {
    this.saves = [];
    this.game = gameCharacter;
  }

  save() {
    // data 是引用类型, 则应该深拷贝
    const save = new GameSave(deepClone(this.game.state));
    this.saves.push(save);
    console.log('Game Saved.');
  }

  restore(index: number = -1) {
    console.log('Restoring Game...');

    const save = this.saves.at(index);
    if (!save) return;

    this.game.state = save.saveData;
  }
}
