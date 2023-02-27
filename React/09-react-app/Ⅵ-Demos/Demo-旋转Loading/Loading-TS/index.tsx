import React, { type FC, type PropsWithoutRef } from "react";
import "./index.css";

type ListItem = {
  name: keyof LoadingOptions;
  defaultVal: string;
};

type LoadingOptions = {
  bgColor?: string;
  radius?: string;
  ringWidth?: string;
  animationTime?: string;
};

const propsList: ListItem[] = [
  {
    name: "bgColor",
    defaultVal: "#6cefef",
  },
  {
    name: "radius",
    defaultVal: "100px",
  },
  {
    name: "ringWidth",
    defaultVal: "20%",
  },
  {
    name: "animationTime",
    defaultVal: "0.6s",
  },
];

const Loading: FC<PropsWithoutRef<{ opts?: LoadingOptions }>> = ({
  opts = {},
}) => {
  const docEle = document.documentElement;

  propsList.forEach((item) => {
    const propsVal = opts[item.name] || item.defaultVal;
    docEle.style.setProperty(`--loading-${item.name}`, propsVal);
  });

  return (
    <div className="loadingWrap">
      <div className="loading" />
    </div>
  );
};

export default Loading;
