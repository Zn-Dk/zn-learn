import { createSlice } from "@reduxjs/toolkit";

export const personSlice = createSlice({
  // 名称
  name: "person",
  // 初始状态
  initialState: {
    value: [],
  },
  reducers: {
    addPerson: (state, { payload, type }) => {
      state.value = [payload, ...state.value];
    },
  },
});

// 导出 actions (使用切片自动生成的 - 内部使用 createAction)
export const { addPerson } = personSlice.actions;

// 导出 reducer
export default personSlice.reducer;

// 导出 selector 函数 去除 state.value 层
export const personSelector = (state) => state.person.value;
