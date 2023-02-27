import React from "react";
import "./index.css";

const propsList = [
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
const Loading = ({ opts = {} }) => {
  const docEle = document.documentElement;

  propsList.forEach((item) => {
    const propsVal = opts[item.name] || item.defaultVal;
    docEle.style.setProperty(`--loading-${item.name}`, propsVal);
  });

  return (
    <div className="loadingWrap">
      <div className="loading"></div>
    </div>
  );
};

export default Loading;
