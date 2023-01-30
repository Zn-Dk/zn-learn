import React, { useEffect, useState } from 'react'
import type { FC } from 'react'

// 引入路由表
import {
  NavLink,
  useHref,
  useInRouterContext,
  useLocation,
  useRoutes,
} from 'react-router-dom'
import routes from './routes'

import type { MenuProps } from 'antd'
import { Menu, Col, Row } from 'antd'

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

export const App: FC = () => {
  // 利用路由表生成视图
  const element = useRoutes(routes)

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  // 使用 useLocation 获得location对象 并监视
  const location = useLocation()
  useEffect(() => {
    setSelectedKeys([location.pathname.slice(1)])
    console.log(selectedKeys)
  }, [])

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
        {/* 在此导入路由视图 */}
        <Col span={18}>{element}</Col>
      </Row>
    </>
  )
}
