import { GameCharacter } from './game-character';
import { GameProgressKeeper } from './progress-keeper';

const gameCharacter = new GameCharacter();

const gameProgressKeeper = new GameProgressKeeper(gameCharacter);

gameCharacter.killAnEnemy();
gameCharacter.move(1, 3, 5);
gameCharacter.grabItem('knife');
gameCharacter.killAnEnemy();

console.log(gameCharacter.status);
/*
Character Info:

        Score: 20
        Location: 1, 3, 5,
        Inventory: knife
        Level: 1
*/
gameProgressKeeper.save();

gameCharacter.move(2, 3, 5);
gameCharacter.grabItem('sword');
gameCharacter.killABoss();

console.log(gameCharacter.status);
/*
Character Info:

        Score: 120
        Location: 3, 6, 10,
        Inventory: knife, sword
        Level: 1
*/
gameProgressKeeper.save();

gameCharacter.passLevel();
gameCharacter.grabItem('gun');
gameCharacter.dropItem('knife');
gameCharacter.killABoss();

console.log(gameCharacter.status);
/*
Character Info:

        Score: 220
        Location: 3, 6, 10,
        Inventory: sword, gun
        Level: 2
*/
gameProgressKeeper.save();

// Decide to restore gameSave
console.dir(gameProgressKeeper.saves);

gameProgressKeeper.restore(-2);

console.log(gameCharacter.status);
/*
Character Info:

        Score: 120
        Location: 3, 6, 10,
        Inventory: knife, sword
        Level: 1
*/
