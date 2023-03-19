import React, { type FC, type PropsWithoutRef } from "react";
import "./index.css";

type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];

type LoadingOptions = {
  color: string; // 圆环颜色
  bgColor: string; // 中心遮罩背景色，默认白色页面，如需要暗色页面请配置此项
  radius: string; // 圆环半径(大小)
  ringWidth: string; // 圆环宽度(%)
  animationTime: string; // 动画速度 s
  tailType: "normal" | "short" | "tiny"; // 拖尾长度,这里通过 css 变量控制
  round: "block" | "none"; // 是否为圆头
};
const tailVar = {
  normal: "--loading-tail-normal",
  short: "--loading-tail-short",
  tiny: "--loading-tail-tiny",
};

const defaultProps: LoadingOptions = {
  color: "#6cefef",
  bgColor: "#fff",
  radius: "100px",
  ringWidth: "20%",
  animationTime: "0.6s",
  tailType: "normal",
  round: "block",
};

const Loading: FC<PropsWithoutRef<{ opts?: Partial<LoadingOptions> }>> = ({
  opts = defaultProps,
}) => {
  const docEle = document.documentElement;
  const entries = Object.entries(defaultProps) as Entries<LoadingOptions>;
  entries.forEach(([k, v]) => {
    const propsVal = opts[k] || v;
    if (k === "tailType") {
      docEle.style.setProperty(
        `--loading-tail-type`,
        `var(${tailVar[propsVal as LoadingOptions["tailType"]]})`
      );
    } else {
      docEle.style.setProperty(`--loading-${k}`, propsVal);
    }
  });

  // let key: keyof LoadingOptions
  // for (key in defaultProps) {
  //   const propsVal = opts[key]
  //   if (key === 'tailType') {
  //     docEle.style.setProperty(
  //       `--loading-tail-type`,
  //       `var(${tailVar[propsVal as LoadingOptions['tailType']]})`,
  //     )
  //   } else {
  //     docEle.style.setProperty(`--loading-${key}`, propsVal)
  //   }
  // }

  return (
    <div className="loadingWrap">
      <div className="loading">
        <div className="roundWrap"></div>
      </div>
    </div>
  );
};

export default Loading;
