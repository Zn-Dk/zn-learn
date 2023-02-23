import React, { Suspense, useEffect, useState } from 'react'
import type { FC } from 'react'

// 引入路由表
import { NavLink, useHref, useInRouterContext, useLocation, useRoutes } from 'react-router-dom'
import routes from './routes'

import type { MenuProps } from 'antd'
import { Menu, Col, Row } from 'antd'
import NotFound from './pages/Home/404'
import Loading from './components/Loading'
import { useAppDispatch, useAppSelector } from '@/hooks/redux'

type MenuItem = Required<MenuProps>['items'][number]

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[],
  type?: 'group',
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
    type,
  } as MenuItem
}

const items: MenuItem[] = [
  getItem(<NavLink to={'/home'}>Home</NavLink>, 'home'),
  getItem(<NavLink to={'/about'}>About</NavLink>, 'about'),
]

const App: FC = () => {
  // 利用路由表生成视图
  const element = useRoutes(routes)

  // Menu 第一层菜单高亮使用 useLocation 获得location对象，保留第一层
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const location = useLocation()
  useEffect(() => {
    const rootPath = location.pathname.split('/')[1]
    setSelectedKeys([rootPath])
  }, [location])

  return (
    <>
      <Row>
        <Col span={6}>
          <Menu
            style={{ width: '100%' }}
            selectedKeys={selectedKeys}
            mode="inline"
            items={items}
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
