import React, { useState } from 'react';

export const Demo2 = () => {
  return (
    <div>
      useState 用法的好与坏
      <BadUseCase />
      <GoodUseCase />
    </div>
  );
};

// ... 写无数个 setHandler 非常繁琐
const BadUseCase = () => {
  const [person, setPerson] = useState({
    name: '',
    age: '',
    like: '',
  });

  const setName = e => {
    setPerson({
      ...person,
      name: e.target.value,
    });
  };
  const setAge = e => {
    setPerson({
      ...person,
      age: e.target.value,
    });
  };
  const setLike = e => {
    setPerson({
      ...person,
      like: e.target.value,
    });
  };

  return (
    <div style={{ border: '1px solid' }}>
      Bad Use Case
      <div>
        <label htmlFor="name">name </label>
        <input type="text" value={person.name} onChange={setName} />
      </div>
      <div>
        <label htmlFor="age">age</label>
        <input type="text" value={person.age} onChange={setAge} />
      </div>
      <div>
        <label htmlFor="like">like </label>
        <input type="text" value={person.like} onChange={setLike} />
      </div>
    </div>
  );
};

const GoodUseCase = () => {
  const [person, setPerson] = useState({
    name: '',
    age: '',
    like: '',
  });

  const dataStateHandler = e => {
    // 我们可以直接利用 html 原生的 name 属性
    const { value, name } = e.target;
    setPerson({
      ...person,
      [name]: value, // 一个动态属性搞定
    });
  };

  return (
    <div style={{ border: '1px solid' }}>
      Good Use Case
      {Object.entries(person).map(([key, value]) => {
        console.log(key, value);
        return (
          <div key={key}>
            <label htmlFor={key}>{key}</label>
            <input type="text" name={key} value={value} onChange={dataStateHandler} />
          </div>
        );
      })}
    </div>
  );
};

export default Demo2;
