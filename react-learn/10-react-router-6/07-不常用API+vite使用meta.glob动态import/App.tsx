import React, { useEffect, useState } from 'react'
import type { FC } from 'react'

// 引入路由表
import {
  NavLink,
  useInRouterContext,
  useLocation,
  useNavigate,
  useNavigationType,
  useResolvedPath,
  useRoutes,
} from 'react-router-dom'
import routes from './routes'

import type { MenuProps } from 'antd'
import { Menu, Col, Row, Button } from 'antd'

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
  const element = useRoutes(routes)
  const [selectedKeys, setSelectedKeys] = useState<string[]>([])
  const location = useLocation()
  useEffect(() => {
    const rootPath = location.pathname.split('/')[1]
    setSelectedKeys([rootPath])
    console.log(selectedKeys)
  }, [location])

  const navigate = useNavigate()

  /*
    useNavigationType() 返回当前的导航类型（用户是如何来到当前页面的）。
    返回值：POP(地址栏进入或者刷新页面)、PUSH、REPLACE。
  */
  const navType = useNavigationType()
  useEffect(() => {
    console.log('当前导航方式', navType)
  }, [location])

  /*
    useResolvedPath() 给定一个 URL 值，解析其中的：path、search、hash 值。
      - hash: '#React'
      - pathname: '/user'
      - search: '?id=001&name=Bruce'
  */
  const res = useResolvedPath('/user?id=001&name=Bruce#React')
  console.log(res)

  /*
    如果组件在 <Router> 的上下文中呈现，则 useInRouterContext
    钩子返回 true，否则返回 false。即组件有没有被包裹在 <BrowserRouter> 这种东西里面。
  */
  const isInRouter = useInRouterContext()
  console.log(isInRouter)
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
        <Col
          span={18}
          style={{ padding: '10px' }}
        >
          <div className="control">
            <Button onClick={() => navigate(-1)}>后退</Button>
            <Button onClick={() => navigate(1)}> 前进 </Button>
            <Button onClick={() => navigate(-2)}> 后退2步 </Button>
            <Button onClick={() => navigate('../', { relative: 'path' })}> 返回上一层 </Button>
            <Button onClick={() => navigate('/about', { replace: true })}> 前往 about </Button>
          </div>
          {element}
        </Col>
      </Row>
    </>
  )
}

export default App
