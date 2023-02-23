import React, { useEffect, useMemo, useState } from 'react'
import type { FC } from 'react'
/////////////////////////// router ///////////////////////////////
import { NavLink, useLocation, useRoutes } from 'react-router-dom'
import routes from './routes'

/////////////////////////// redux ///////////////////////////////
import { useAppSelector, useMydispatch } from '@/hooks/redux'

/////////////////////////// antd Menu ///////////////////////////////
import { Menu, Col, Row } from 'antd'
import type { ItemType } from 'antd/es/menu/hooks/useItems'

// import type { MenuProps } from 'antd'
// type MenuItem = Required<MenuProps>['items'][number]
// function getItem(
//   label: React.ReactNode,
//   key?: React.Key | null,
//   icon?: React.ReactNode,
//   children?: MenuItem[],
//   type?: 'group',
// ): MenuItem {
//   return {
//     key,
//     icon,
//     children,
//     label,
//     type,
//   } as MenuItem
// }

// 0.定义原始菜单列表, 其中 need_auth - none 任何时候都能被展示 | false 仅对游客展示 | true 仅登录用户展示
const menulist = [
  {
    label: 'Home',
    path: '/home',
    key: 'home',
    need_auth: 'none',
  },
  {
    label: 'Login / Register',
    path: '/auth/login',
    key: 'auth',
    need_auth: false,
  },
  {
    label: '??的个人中心',
    path: '/userInfo',
    key: 'userInfo',
    need_auth: true,
  },
  {
    label: 'StudentList',
    path: '/student',
    key: 'student',
    need_auth: 'none',
  },
  {
    label: '登出',
    path: '/',
    key: 'logout',
    need_auth: true,
    clickCb: 'logout',
  },
]
// 1.个人中心字段处理 fn
const getUserMenu = (userName = '') => {
  const tmpMenu = JSON.parse(JSON.stringify(menulist))
  tmpMenu[2].label = `${userName}的个人中心`
  return tmpMenu as typeof menulist
}

/////////////////////////// App ///////////////////////////////
const App: FC = () => {
  const element = useRoutes(routes)
  const dispatch = useMydispatch()
  const location = useLocation()

  // 2.获取 用户auth store
  const { expTime, isLogin, user } = useAppSelector(state => state.auth.value)
  // handler 如果已经登录且登录态过期 需要退出
  useEffect(() => {
    if (isLogin && expTime - Date.now() <= 0) {
      dispatch('clearUserState', () => {
        console.log('登录态过期,登出...')
      })
    }
  }, [location, expTime])

  // Menu 第一层菜单高亮: 使用 useLocation 获得location对象，保留第一层
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  useEffect(() => {
    const rootPath = location.pathname.split('/')[1]
    setSelectedKeys([rootPath])
    // console.log(selectedKeys)
  }, [location])

  // 3.返回实际菜单列表供 antd Menu 组件渲染

  // 3.1 Menu事件对象
  const menuEvents = {
    logout: () => {
      dispatch('clearUserState', () => {
        console.log('登出!')
      })
    },
  }
  type menuEventsKey = keyof typeof menuEvents
  // 3.2 事件 handler
  const evtHandler = (name: menuEventsKey) => {
    typeof menuEvents[name] === 'function' && menuEvents[name]()
  }
  // 3.3 过滤权限列表
  const realMenu = useMemo(() => {
    return getUserMenu(user?.username)
      .filter(({ need_auth }) => need_auth === isLogin || need_auth === 'none')
      .map(({ label, path, key, clickCb }) => ({
        label: (
          <NavLink
            to={path}
            onClick={() => evtHandler(clickCb as menuEventsKey)}
          >
            {label}
          </NavLink>
        ), // 4.2 包装为 NavLink
        key,
      }))
  }, [isLogin]) as ItemType[]

  return (
    <>
      <Row>
        <Col span={6}>
          <Menu
            style={{ width: '100%' }}
            selectedKeys={selectedKeys}
            mode="inline"
            items={realMenu}
          />
        </Col>
        {/*
          在此放置路由视图 (自动解析成 <Route/> 组件列表)
          注意: 如果有懒加载的组件且路由表没有预先 Suspense 包裹 需要在此处包裹
        */}
        <Col span={18}>
          {/* <Suspense fallback={<Loading />}>{element}</Suspense> */}
          {element}
        </Col>
      </Row>
    </>
  )
}

export default App
