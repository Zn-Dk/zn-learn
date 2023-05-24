import React, { CSSProperties, useState } from 'react';
import logo from './logo.svg';
import './App.css';

function App() {
  const [count, setCount] = useState(0);

  const buttonStyle: CSSProperties = {
    fontSize: '20px',
    backgroundColor: '#368',
    color: '#fff',
    padding: '10px',
    borderRadius: '6px',
    border: '1px solid #fff',
    cursor: 'pointer',
  };

  const [username, setUsername] = useState('');
  const [userList, setUserList] = useState(['zhangsan', 'lisi', 'pony']);

  const addUser = () => {
    setUserList([...userList, username]);
    setUsername('');
  };
  const removeUser = (idx: number) => {
    setUserList(list => {
      const tmp = [...list];
      tmp.splice(idx, 1);
      return tmp;
    });
  };
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <a className="App-link" href="https://reactjs.org" target="_blank" rel="noopener noreferrer">
          Learn React
        </a>
        {/* 使用 data-testid 作为 jest 测试 id */}
        <button data-testid="btn" data-value={count} style={buttonStyle} onClick={() => setCount(c => c + 1)}>
          count is : {count}
        </button>
        <br />
        <div className="input-section">
          <input
            data-testid="userInput"
            type="text"
            value={username}
            onChange={e => setUsername(e.target.value)}
            placeholder="添加用户"
          />
          <button data-testid="addUserBtn" onClick={addUser}>
            addUser
          </button>
        </div>

        <div>
          <h2>List</h2>
          <ul data-testid="userList">
            {userList.map((item, idx) => (
              <li key={idx}>
                {item}
                <button onClick={() => removeUser(idx)} data-testid={`removeBtn-item-${idx}`}>
                  x
                </button>
              </li>
            ))}
          </ul>
        </div>
      </header>
    </div>
  );
}

export default App;
