import { Game1 } from './game1';
import { Game2 } from './game2';
import { Game3 } from './game3';

const game1 = new Game1();
game1.addWinner(3, 'Kiki');

const game2 = new Game2();
game2.addWinner(1, 'John');

const game3 = new Game3();
game3.addWinner(2, 'Leo');

const res1 = game1.leaderBoard.print();
console.log(res1);

const res2 = game2.leaderBoard.print();
console.log(res2);

const res3 = game3.leaderBoard.print();
console.log(res3);
/*

Log same result for all games:

------------- SCORE -------------
|       1       |       John    |
|       2       |       Leo     |
|       3       |       Kiki    |
---------------------------------

------------- SCORE -------------
|       1       |       John    |
|       2       |       Leo     |
|       3       |       Kiki    |
---------------------------------

------------- SCORE -------------
|       1       |       John    |
|       2       |       Leo     |
|       3       |       Kiki    |
---------------------------------

*/
