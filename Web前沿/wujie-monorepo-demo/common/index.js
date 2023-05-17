import axios from 'axios';

export const foo = 123;

export const rdm = num => {
  return Math.random(num);
};

export const fetchData = async () => {
  const res = await axios.get('https://jsonplaceholder.typicode.com/todos/1');
  return res.data;
};
