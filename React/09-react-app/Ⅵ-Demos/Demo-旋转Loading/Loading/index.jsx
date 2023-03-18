import React from "react";
import "./index.css";

/**
 * color?: string; // 圆环颜色
 * bgColor?: string; // 中心遮罩背景色，默认白色页面，如需要暗色页面请配置此项
 * radius?: string; // 圆环半径(大小)
 * ringWidth?: string; // 圆环宽度
 * animationTime?: string; // 动画速度 s
 * tailType: 'normal' | 'short' | 'tiny' // 拖尾长度,这里通过 css 变量控制
 * round: 'block' | 'none' // 是否为圆头
 */

const tailVar = {
  normal: "--loading-tail-normal",
  short: "--loading-tail-short",
  tiny: "--loading-tail-tiny",
};

const defaultProps = {
  color: "#6cefef",
  bgColor: "#fff",
  radius: "100px",
  ringWidth: "20%",
  animationTime: "0.6s",
  tailType: "normal",
  round: "block",
};
const Loading = ({ opts = {} }) => {
  const docEle = document.documentElement;
  const entries = Object.entries(defaultProps);
  entries.forEach(([k, v]) => {
    const propsVal = opts[k] || v;
    if (k === "tailType") {
      docEle.style.setProperty(
        `--loading-tail-type`,
        `var(${tailVar[propsVal]})`
      );
    } else {
      docEle.style.setProperty(`--loading-${k}`, propsVal);
    }
  });
  return (
    <div className="loadingWrap">
      <div className="loading"></div>
    </div>
  );
};

export default Loading;
