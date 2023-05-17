const list = [
  { name: 'Zhon', age: 12 },
  { name: 'ZZhon', age: 13 },
  { name: 'Ghon', age: 44 },
];

const wrap = document.createElement('div');

export const addList = (attach = 'body') => {
  const frag = document.createDocumentFragment();
  list.forEach(item => {
    const p = document.createElement('p');
    p.innerHTML = `name: ${item.name} - age: ${item.age}`;
    frag.append(p);
  });
  wrap.append(frag);
  document.querySelector(attach).append(wrap);
};
