import React from "react";
import { useRef } from "react";

export default function test() {
  // 使用类型约束 并初始 ref 为 null
  const ipt = useRef<HTMLInputElement>(null);

  const doAlert = () => {
    alert(ipt.current?.value);
  };

  return (
    <div>
      Hello React
      <input
        type="text"
        ref={ipt}
      />
      <button onClick={doAlert}>Alert!</button>
    </div>
  );
}
