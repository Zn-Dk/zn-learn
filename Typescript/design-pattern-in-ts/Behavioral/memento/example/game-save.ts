import { ICharacterInfo } from './game-character';

// 角色: Memento
export class GameSave {
  saveData: ICharacterInfo;

  constructor(saveData: ICharacterInfo) {
    this.saveData = saveData;
  }
}
