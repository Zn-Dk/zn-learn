import React, { useState, type ChangeEvent } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Checkbox, Input } from 'antd'
import type { CheckboxChangeEvent } from 'antd/es/checkbox'


const newList = [
  '头条新闻1 BALABALA',
  '头条新闻2 BALABALA',
  '娱乐新闻1 BALABALA',
  '娱乐新闻2 BALABALA',
  '科技新闻3 BALABALA',
  '科技新闻4 BALABALA',
  '科技新闻5 BALABALA',
]
export default function News() {
  const [search, setSearch] = useSearchParams({
    query: '',
    // onlyHeadTitle: 'false',
  })
  // 状态使用 search 维持
  const onlyHeadTitle = search.get('onlyHeadTitle') === 'true';
  const query = search.get('query') || '';

  // 使用 useSearchParams 保存搜索表单信息
  const handleOnlyHeadTitle = (e: CheckboxChangeEvent) => {
    setSearch(prev => {
      prev.set('onlyHeadTitle', String(e.target.checked))
      return prev;
      // replace 以便导航回退时直接回退到上一个页面, 而非上次操作
    }, {replace: true})
  }

  const handleSearch = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(prev => {
      prev.set('query', e.target.value)
      return prev;
    }, {replace: true})
  }

  const displayNews = newList.filter(item => {
    if(onlyHeadTitle) {
      return item.includes('头条') && item.includes(query);
    }
    return item.includes(query);
  })

  return (
    <div>
      <div
        className="search"
        style={{ paddingTop: '10px' }}
      >
        <Input placeholder="type to search" value={query} onChange={handleSearch}  />
        <Checkbox checked={onlyHeadTitle} onChange={handleOnlyHeadTitle}>只显示头条新闻</Checkbox>
      </div>
      <ul className="new-list">
        {
          displayNews.map(item => (<li>{item}</li>))
        }
      </ul>
    </div>
  )
}
