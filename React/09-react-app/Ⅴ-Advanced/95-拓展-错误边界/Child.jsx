import React from "react";

export default function Child() {
  const rdm = Math.random();
  const foo = rdm > 0.3 ? { a: 1 } : <h2>Hello World</h2>;
  return <div>Content: {foo}</div>;
}
