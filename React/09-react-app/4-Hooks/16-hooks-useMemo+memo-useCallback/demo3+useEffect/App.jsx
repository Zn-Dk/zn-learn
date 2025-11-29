import React, { useEffect, useMemo, useState } from 'react';

// 使用 useMemo 提供的计算属性联动 useEffect
export const App = () => {
  const [person, setPerson] = useState({
    name: '',
    age: '',
    region: '',
  });
  const [showWarn, setShowWarn] = useState(false);
  const [success, setSuccess] = useState(false)

  // UserType 记录需要计算的属性
  const userType = useMemo(
    () => ({
      underAge: person.age && person.age < 18 ? true : false,
      notAsia: person.region !== 'Asia' ? true : false,
    }),
    [person.age, person.region]
  );

  // 执行副作用
  useEffect(() => {
    console.log('UserType changed!');
    if (Object.values(person).some(value => !value)) return;

    if (userType.notAsia || userType.underAge) {
      setShowWarn(true);
    } else {
      setSuccess(true);
    }
  }, [userType]);

  const handleSetInput = e => {
    const { name, value } = e.target;
    setShowWarn(false);
    setSuccess(false);
    setPerson({
      ...person,
      [name]: value,
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', rowGap: '10px' }}>
      {/* name 改变时无需响应 */}
      <input type="text" name="name" onChange={handleSetInput} placeholder="input your name." />
      {/* 只校验 age 和 region */}
      <input type="number" name="age" onChange={handleSetInput} placeholder="input your age." />
      <select name="region" onChange={handleSetInput} value={person.region}>
        <option value="" disabled>
          choose your region.
        </option>
        <option value="Asia">Asia</option>
        <option value="America">America</option>
        <option value="Europe">Europe</option>
      </select>
      {showWarn && <WarnText />}
      {success && <SuccessText />}
    </div>
  );
};

const WarnText = () => (
  <div>
    <h3>Oops! You are not allow to join this group</h3>
  </div>
);

const SuccessText = () => (
  <div>
    <h3>Welcome! Press SUBMIT button to proceed</h3>
    <button style={{ borderRadius: '4px', padding: '10px', background: 'orange' }}>JOIN</button>
  </div>
);

export default App;
