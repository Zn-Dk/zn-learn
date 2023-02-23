import React from "react";
import { hexToRgba, RGB2Hex } from "./utils";

const d = new Date();
const month = d.toLocaleString("zh-cn", { month: "long" });
const day = d.getDate();
const weekday = d.toLocaleString("zh-cn", { weekday: "long" });
export default function App() {
  const [hex, setHex] = React.useState("#000000");
  const [rgb, setRgb] = React.useState("0,0,0");

  const [currentColor, setCurrentColor] = React.useState("#000");

  const handleColor = (type, color) => {
    switch (type) {
      case "hex":
        setRgb("");
        if (hexToRgba(color)) {
          const { r, g, b } = hexToRgba(color);
          setRgb(`${r},${g},${b}`);
          setCurrentColor(`rgb(${r},${g},${b})`);
        }
        setHex(color);
        break;
      case "rgb":
        setHex("");
        const resHex = RGB2Hex(color);
        setRgb(color);
        setCurrentColor(`rgb(${color})`);
        setHex(resHex);
        break;
      default:
        break;
    }
  };

  return (
    <div>
      <h1>快速显色盘</h1>
      <div id="calendar">
        <div className="month">{month}</div>
        <div className="date">{day}</div>
        <div className="weekday">{weekday}</div>
      </div>
      <div
        className="color-box"
        style={{ backgroundColor: currentColor }}
      ></div>
      <div className="input-wrap">
        <span>HEX </span>
        <input
          type="text"
          id="hex"
          onChange={(e) => handleColor("hex", e.target.value)}
          value={hex}
        />
      </div>
      <div className="input-wrap">
        <span>RGB </span>
        <input
          type="text"
          id="rgb"
          onChange={(e) => handleColor("rgb", e.target.value)}
          value={rgb}
        />
      </div>
    </div>
  );
}
