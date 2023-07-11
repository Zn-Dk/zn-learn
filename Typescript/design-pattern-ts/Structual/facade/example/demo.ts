import { GameApi } from './game-api';

const API = new GameApi();

API.createUser({
  name: 'John',
  email: '123@example.com',
  password: 'password',
});

API.draw('some object');

API.gameState();

const history = API.logHistory();

console.log(history);
/*
  [LOG]: [User] create user with id: 2e97bd
  [LOG]: draw object some object
  [LOG]: Now rendering 1 objects: some object
*/
