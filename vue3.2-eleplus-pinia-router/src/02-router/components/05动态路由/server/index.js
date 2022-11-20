const express = require('express')
const { readFileSync } = require('fs')

const app = express()
app.use(express.urlencoded({ extended: false }))
app.use(express.json())
/*
  动态路由 demo 流程

  1. 前端登录认证, 从数据库取出用户信息, 并且含有相关用户权限的字段
  2. 根据字段到路由表中过滤应该返回的路由返回给前端
  3. 调用 vue-router 的 addRoute 方法动态添加路由

*/
const findUserByName = (name, password) => {
  const db = JSON.parse(readFileSync('./user.json', 'utf-8'))
  return db.find(user => {
    return user.username === name && user.password === password
  })
}
/**
 * @description 用于返回权限路由列表
 * @param {Number} authLevel 用户权限等级
 * @return {RouteList[]} 权限列表
 */
const getRouteList = authLevel => {
  const route = JSON.parse(readFileSync('./route.json', 'utf-8'))
  return route.filter(route => {
    return route['auth_level'] <= authLevel
  })
}

const cors = (req, res, next) => {
  res.setHeader('access-control-allow-origin', '*')
  next()
}
app.post('/login', cors, (req, res) => {
  try {
    const { username, password } = req.body
    // 认证用户
    const userInfo = findUserByName(username, password)
    if (!userInfo) {
      res.status(401).send('未找到用户')
    }
    // 找到用户 将路由列表权限返回前端
    const route = JSON.stringify(getRouteList(userInfo['auth_level']))
    res.send(route)
  } catch (error) {
    res.status(401).send('登录失败')
  }
})

app.listen(9999, () => {
  console.log('sever on http://localhost:9999/')
})
