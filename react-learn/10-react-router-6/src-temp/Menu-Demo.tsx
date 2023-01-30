import React, { useEffect, useLayoutEffect, useState } from 'react'
// import { NavLink, Route, Switch, Redirect, } from "react-router-dom";
import type { MenuProps, MenuTheme } from 'antd'
import { Menu, Switch } from 'antd'

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
  getItem('Navigation One', 'sub1', null, [
    getItem('Option 1', '1'),
    getItem('Option 2', '2'),
  ]),

  getItem('Navigation Two', 'sub2', null, [
    getItem('Option 6', '6'),
    getItem('Submenu', 'sub3', null, [
      getItem('Option 7', '7'),
      getItem('Option 8', '8'),
    ]),
  ]),
]

export default function App() {
  const rootMenuKeys = ['sub1', 'sub2']
  // 控制 openKeys 数组实现只展开当前菜单(包括子菜单)
  const [openKeys, setOpenKeys] = useState(['sub1'])

  const onOpenChange = (keys: string[]) => {
    // 点击选项卡时会将 key 新增到当前数组中
    console.log(keys)
    // 查找最新的key
    const latestOpenKey = keys.find(key => !openKeys.includes(key))
    console.log(latestOpenKey)
    // 1.如果不是一级子菜单 保留当前的key
    if (!rootMenuKeys.includes(latestOpenKey!)) {
      setOpenKeys(keys)
    } else {
      // 2. 如果是一级子菜单 只保留最新的 / 如果是折叠所有的菜单 就清空 keys[]
      setOpenKeys(latestOpenKey ? [latestOpenKey] : [])
    }
  }

  return (
    <>
      <Menu
        style={{ width: 256 }}
        defaultSelectedKeys={['sub1']}
        defaultOpenKeys={['sub1']}
        openKeys={openKeys}
        onOpenChange={onOpenChange}
        mode="inline"
        items={items}
      />
    </>
  )
}
