import React, { useEffect, useState } from 'react'
import type { FC } from 'react'

import { NavLink, useLocation, useRoutes } from 'react-router-dom'
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
  const element = useRoutes(routes)

  const [selectedKeys, setSelectedKeys] = useState<string[]>([])

  const location = useLocation()
  useEffect(() => {
    setSelectedKeys([location.pathname.slice(1)])
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
        <Col span={18}>{element}</Col>
      </Row>
    </>
  )
}
