import React, { useRef, useState } from "react";
import { useTransition } from "react";
import Loading from "./Loading";

// 这个列表非常长 每次搜索都会造成卡顿
const VeryLongList = ({ searchVal }) => {
  const filterList = Array.from({ length: 9999 }, (it, idx) => {
    return { key: Math.random(), value: ~~(Math.random() * 1000) };
  }).filter((item) => item.value >= +searchVal);
  return (<>
      <p>搜索结果共: { filterList.length } 项</p>
      <ul>
        {filterList.length ? (
          filterList.map(({ key, value }, idx) => (
            <li key={key}>
              Index: {idx} - Value: {value}
            </li>
          ))
        ) : (
          <h3>很抱歉,没有找到</h3>
        )}
      </ul>
    </>
  );
};

const App = () => {
  const [searchValue, setSearchValue] = useState(0);

  const [isPending, startTransition] = useTransition();
  // isPending <-是否仍在渲染 布尔值,可以通过这个开关做加载提示/骨架屏
  // startTransition <-渲染回调

  const [isTyping, setIsTyping] = useState(false);
  const timer = useRef(0);

  // 以下是结合了防抖+useTransition 的例子
  const setIptSearch = (e) => {
    setSearchValue(e.target.value);
    // 这里做防抖
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = undefined;
    }
    setIsTyping(true);
    timer.current = setTimeout(() => {
      setIsTyping(false);
      // 这里做 useTransition
      startTransition(() => {});
    }, 1000);
  };

  const debounceList = () => {
    const list = <VeryLongList searchVal={searchValue} />;
    console.log("isTyping", isTyping);
    return isTyping ? null : list;
  };

  return (
    <div>
      <h1>useTransition</h1>
      <h3>
        - 情景：
        <br />
        下面有一个列表(9999项数据的超长列),有一个实时过滤搜索框
        <br />
        每当用户进行输入的时候都会带动这个列表重新渲染,十分卡顿。
        <br />
        <br />
        - 优化角度:
        <br />
        useTransition 钩子, 可以返回一个回调包裹这个输入渲染列表
        <br />
        <br />
        - 源码机制:
        <br />
        并发机制，也就是基于 Lane 的优先级实现的 api,产生带时间分片的循环
        <br />
      </h3>
      <hr />
      <h2>演示: useTransition + 防抖结合优化渲染 </h2>
      <h3>防抖优化输入卡顿的体验, useTransition 优化加载渲染体验</h3>
      <hr />
      <h2> VeryLongList : </h2>
      <span>列表中大于等于</span>
      <input
        type="number"
        onChange={setIptSearch}
        value={searchValue}
      />
      <span>的项</span>
      {isPending ? <Loading /> : debounceList()}
    </div>
  );
};

export default App;
