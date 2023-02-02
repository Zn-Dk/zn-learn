import React from "react";

export default function Error() {
  return (
    <div>
      <h2 style={{ color: "red" }}>
        <strong>Oops! 网络繁忙,请稍后再试</strong>
      </h2>
      <button onClick={() => window.location.reload()}>点击刷新</button>
    </div>
  );
}
