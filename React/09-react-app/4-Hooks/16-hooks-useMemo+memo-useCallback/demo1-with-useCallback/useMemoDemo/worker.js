/* eslint-env worker */
/* eslint-disable no-restricted-globals */

const getComplexResult = (x, y) => {
  const t = Date.now();
  while (true) {
    if (Date.now() - t > 3000) {
      return x + y;
    }
  }
};

self.onmessage = (event) => {
  const { x, y } = event.data;
  const result = getComplexResult(x, y);
  self.postMessage(result);
};