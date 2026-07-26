
import React, { Suspense, use, useEffect, useState } from 'react'

// Suspense 场景2: 含异步的组件
// React19 新api -> use
// 设计思想类似 Nextjs

type User = { name: string; age: number; gender: string }
type Post = { id: number; title: string; content: string }

// API 路径与返回类型的映射
type ApiReturnTypeMap = {
  'v1/user': User;
  'v1/post': Post;
}

// 提取所有可用的 API 路径
type ApiPath = keyof ApiReturnTypeMap

// 缓存 Map，使用更精确的类型
const apiCacheMap = new Map<ApiPath, ApiReturnTypeMap[ApiPath]>()

// fetchData 返回类型严格约束为 Promise<ApiReturnTypeMap[K]>
const fetchData = <K extends ApiPath>(url: K): Promise<ApiReturnTypeMap[K]> => {
  // 模拟 API 数据
  const mockData: ApiReturnTypeMap = {
    'v1/user': { name: 'user', age: 10, gender: 'male' },
    'v1/post': { id: 1, title: 'Hello', content: 'World' },
  }

  return new Promise<ApiReturnTypeMap[K]>((resolve, reject) => {
    setTimeout(() => {
      if (url in mockData) {
        resolve(mockData[url] as ApiReturnTypeMap[K])
      } else {
        reject(new Error('url not found'))
      }
    }, 1000)
  })
}

// handleFetch 返回类型严格约束
const handleFetch = async <K extends ApiPath>(url: K): Promise<ApiReturnTypeMap[K]> => {
  if (apiCacheMap.has(url)) {
    // 缓存命中，返回缓存数据
    return apiCacheMap.get(url) as ApiReturnTypeMap[K]
  }
  const data = await fetchData(url)
  apiCacheMap.set(url, data)
  return data
}

const UserApiComponent = () => {
  const data = use(handleFetch('v1/user'));
  return (
    <div>
      UserApiComponent
      <div>data: {JSON.stringify(data)}</div>
    </div>
  )
}

const UserPostComponent = () => {
  const data = use(handleFetch('v1/post'));
  return (
    <div>
      UserPostComponent
      <div>data: {JSON.stringify(data)}</div>
    </div>
  )
}

const SuspenseUseApiView = () => {
  return (
    <div>
      <h2>SuspenseUseApiView</h2>
      <OldUserApiComponent></OldUserApiComponent>
      <br />
      {/* 
        相比以前在组件内耦合 loading, loadingComponent, useEffect 设置数据
        更优雅的写法 

        loading 就应该在Suspense中处理
        而组件只需要处理数据的渲染
      */}
      <Suspense fallback={<div>loading...</div>}>
        <UserApiComponent />
      </Suspense>
      <Suspense fallback={<div>loading...</div>}>
        <UserPostComponent />
      </Suspense>
    </div>
  )
}

/** 参考以前我们怎么处理异步请求？*/

const OldUserApiComponent = () => {
  const [data, setData] = useState<User | null>(null)
  const [loading, setLoading] = useState(false)
  useEffect(() => {
    setLoading(true)
    fetchData('v1/user')
      .then((res) => {
        setData(res)
      })
      .catch((err) => {
        console.error(err)
        setData(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])
  return (
    <div>
      OldUserApiComponent
      {
        loading
          ? <div>loading...</div>
          : <div>data: {JSON.stringify(data)}</div>
      }
    </div>
  )
}


export default SuspenseUseApiView