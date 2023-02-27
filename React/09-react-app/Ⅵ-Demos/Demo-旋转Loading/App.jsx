import React, { useState } from "react";
import Loading from "./Loading";

export default function App() {
  const [bgColor, setBgColor] = useState("yellowgreen");
  const [radius, setRadius] = useState("100px");
  const [ringWidth, setRingWidth] = useState("20%");
  const [animationTime, setAnimationTime] = useState("0.6s");
  return (
    <div>
      <h2>Loading 旋转加载, 纯CSS实现,样式通过 Loading 组件传入参数改变</h2>
      <hr />
      <p>
        <span>颜色: </span>
        <input
          type="text"
          onChange={(e) => setBgColor(e.target.value)}
          value={bgColor}
        />
      </p>
      <p>
        <span>大小: </span>
        <input
          type="text"
          onChange={(e) => setRadius(e.target.value)}
          value={radius}
        />
      </p>
      <p>
        <span>圆环宽度: </span>
        <input
          type="text"
          onChange={(e) => setRingWidth(e.target.value)}
          value={ringWidth}
        />
      </p>
      <p>
        <span>动画速度: </span>
        <input
          type="text"
          onChange={(e) => setAnimationTime(e.target.value)}
          value={animationTime}
        />
      </p>
      <hr />
      <h3>预览</h3>
      <Loading
        opts={{
          bgColor,
          radius,
          ringWidth,
          animationTime,
        }}
      />
    </div>
  );
}
