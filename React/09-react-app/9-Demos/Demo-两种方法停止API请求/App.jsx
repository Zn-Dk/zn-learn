import axios from 'axios';
import React, { useEffect, useState } from 'react';
const API_URL = 'http://jsonplaceholder.typicode.com/users/';

const ShowCase = ({ children }) => {
  return (
    <div style={{ padding: '20px', marginBottom: '20px', boxShadow: '0 0 6px #999' }}>
      {children}
    </div>
  );
};

const UserInfo = ({ id, name, email }) => {
  return (
    <div>
      <h3>UserInfo: </h3>
      <p>id: {id}</p>
      <p>name: {name}</p>
      <p>email: {email}</p>
    </div>
  );
};

const UserList = ({ onClick }) => {
  const style = {
    fontSize: '14px',
    color: 'skyblue',
    textDecoration: 'underline',
    cursor: 'pointer',
  };
  return (
    <div>
      <p style={style} onClick={() => onClick(1)}>
        Check User Id 1
      </p>
      <p style={style} onClick={() => onClick(2)}>
        Check User Id 2
      </p>
      <p style={style} onClick={() => onClick(3)}>
        Check User Id 3
      </p>
    </div>
  );
};

// ATTENTION: 请在 浏览器模拟 3G 弱网情况
// Case: 获取大量数据时，如果用户频繁切换 可能会导致数据响应不及时而出现数据错误
const Demo = () => {
  const [id, setId] = useState('');

  return (
    <div>
      <h1>两种方法停止你的 api 请求</h1>
      <ShowCase>
        <UserList onClick={id => setId(id)} />
      </ShowCase>
      <ShowCase>
        {/* 传入 key 使得组件在切换时重新渲染 模拟路由跳转 */}
        <DemoFetch key={id} id={id} />
      </ShowCase>
      <ShowCase>
        {/* 传入 key 使得组件在切换时重新渲染 模拟路由跳转 */}
        <DemoAxiosGet key={id} id={id} />
      </ShowCase>
    </div>
  );
};

const DemoFetch = ({ id }) => {
  const [person, setPerson] = useState({});

  useEffect(() => {
    // 浏览器原生的方法 AbortController
    const controller = new AbortController();
    // 1. 获取 signal 作为信号
    const signal = controller.signal;

    // 2. 对应原生 fetch 只需要传入 signal 即可
    fetch(API_URL + id, { signal })
      .then(rsp => rsp.json())
      .then(data => setPerson(data))
      .catch(e => {
        // 在 catch 里我们就能看到主动停止请求的 error 了
        const msg = e.message;
        if (/aborted/.test(msg)) {
          console.log('User aborted!');
        } else {
          console.error(`[Network Failed] ${msg}`);
        }
      });

    // 3. 对应清除函数 也就是路由改变时, 停止请求
    return () => {
      controller.abort();
    };
  }, [id]);

  return (
    <div>
      <h2>Demo Fetch using AbortController</h2>
      <UserInfo {...person}></UserInfo>
    </div>
  );
};

// 使用 axios
const DemoAxiosGet = ({ id }) => {
  const [person, setPerson] = useState({});

  useEffect(() => {
    // 1. 我们使用 CancelToken工厂函数创建cancel token
    // 2. source 方法拿到实例
    const source = axios.CancelToken.source();

    axios
      // 3. cancelToken 属性中传入 token
      .get(API_URL + id, { cancelToken: source.token })
      .then(res => setPerson(res.data))
      .catch(e => {
        //   {
        //     "message": "canceled",
        //     "name": "CanceledError",
        //     "stack": "CanceledError: canceled\n    at Object.cancel (http://localhost:3000/static/js/bundle.js:40210:22)\n    at http://localhost:3000/static/js/bundle.js:251:14\n    at safelyCallDestroy (http://localhost:3000/static/js/bundle.js:26932:9)\n    at commitHookEffectListUnmount (http://localhost:3000/static/js/bundle.js:27070:15)\n    at commitPassiveUnmountInsideDeletedTreeOnFiber (http://localhost:3000/static/js/bundle.js:28751:15)\n    at commitPassiveUnmountEffectsInsideOfDeletedTree_begin (http://localhost:3000/static/js/bundle.js:28707:9)\n    at commitPassiveUnmountEffects_begin (http://localhost:3000/static/js/bundle.js:28629:15)\n    at commitPassiveUnmountEffects (http://localhost:3000/static/js/bundle.js:28617:7)\n    at flushPassiveEffectsImpl (http://localhost:3000/static/js/bundle.js:30440:7)\n    at flushPassiveEffects (http://localhost:3000/static/js/bundle.js:30393:18)",
        //     "code": "ERR_CANCELED",
        //     "status": null
        // }
        // 5.调用 axios 的静态方法传入 error 判断是否为请求终止事件
        if (axios.isCancel(e)) {
          console.log('User aborted! Axios');
        } else {
          console.error(e);
        }
      });

    // 4. 对应清除函数 执行 source 的 cancel 方法
    return () => {
      source.cancel();
    };
  }, [id]);

  return (
    <div>
      <h2>Demo Axios using AxiosCancelToken</h2>
      <UserInfo {...person}></UserInfo>
    </div>
  );
};

export default Demo;
