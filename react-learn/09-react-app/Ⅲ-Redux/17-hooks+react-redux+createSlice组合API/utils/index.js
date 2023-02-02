export const unwrapState = (state) => {
  const o = {};
  for (const key in state) {
    o[key] = state[key].value;
  }
  return o;
};
