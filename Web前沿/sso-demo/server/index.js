import express from 'express'
import session from 'express-session'
import cors from 'cors'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import config from './config.js'

const serverConfig = { ...config };

const app = express();

app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public', {
//   index: 'sso.html'
// }));
// session
app.use(session({
  secret: 'sso-secret',
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: 1000 * 60 * 60,
    httpOnly: true,
  }
}))

const generateToken = (appId) => {
  // 实际项目中 expires 应该在 redis 等存储中保存
  const token = jwt.sign({ appId }, serverConfig[appId].secret);
  return token;
}

// sso 页
app.get('/sso', (req, res) => {
  // 检查session 判断用户是否已登录
  console.log('SSO page session:', req.session);
  console.log('SSO page username:', req.session.username);
  if (req.session.username) {
    const { app_id, redirect } = req.query;
    let token = serverConfig[app_id].token;
    // 因为 session 已经存了 username, 如果没有token
    // 可能是在 AppA 登录过, 现在访问 AppB, 此时需要重新生成 token
    if (!token) {
      token = generateToken(app_id);
      // 在对应的 appConfig 中存储 token
      serverConfig[app_id].token = token;
    }
    console.log('serverConfig', serverConfig);
    return res.redirect(`${redirect}?token=${token}`);
  }

  res.sendFile('./public/sso.html', { root: process.cwd() });
})

// sso 登录接口
app.post('/login', (req, res) => {
  console.log('Login session before:', req.session);
  // app 应携带 app_id / redirect
  const { app_id, redirect, username } = req.body;
  console.log('/login request body:', req.body);

  const appConfig = serverConfig[app_id];
  if (!appConfig) {
    return res.status(400).json({ error: 'Invalid app_id' });
  }
  // 登录成功 生成 token 并存储到 session
  console.log('appConfig', appConfig);
  const token = generateToken(app_id);
  // 存储 token 到 redis, 这里模拟存储到 appConfig 里面
  appConfig.token = token;
  // 存储登录的 username 到 session
  req.session.username = username;

  res.redirect(`${redirect}?token=${token}`);
})

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});