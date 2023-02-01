import React, { Suspense, useEffect, useState } from 'react'
import type { FC } from 'react'

// 引入路由表
import { NavLink, useLocation, useNavigate, useRoutes } from 'react-router-dom'
import routes from './routes'

import type { MenuProps } from 'antd'
import { Menu, Col, Row, Button } from 'antd'
import NotFound from './pages/Home/404'
import Loading from './components/Loading'

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

  /*
    编程式导航
    - 参数 1 to
      数字表示 前进后退  或者是字符串路径

    - 参数 2 传递 options 可选如下
      NavigateOptions {
          replace?: boolean;
          state?: any;
          preventScrollReset?: boolean;
          relative?: RelativeRoutingType;
        }
  */

  const navigate = useNavigate()

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
            {/* 选项里的 relative 是指后退层级是相对于路由表配置 route 还是路径 path 的, 根据需求自行选择 */}
            <Button onClick={() => navigate('../', { relative: 'path' })}> 返回上一层 </Button>
            <Button onClick={() => navigate('/about', { replace: true })}> 前往 about </Button>
          </div>
          {/*
            在此放置路由视图 (自动解析成 <Route/> 组件列表)
            注意: 如果有懒加载的组件且路由表没有预先 Suspense 包裹 需要在此处包裹
          */}
          {element}
        </Col>
      </Row>
    </>
  )
}

export default App
