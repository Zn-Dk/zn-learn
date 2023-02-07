/**
 * 当应用规模越来越大时，建议使用单独的模块或文件来存放 action
 * 避免调用时因为 type 以及对传入的 payload 不确定所造成的问题
 * 因此 Action 创建函数 作为统一动作管理
 * 在组件中使用时导入函数 => store.dispatch(Action)
 */
import { ADD_PERSON } from "../constant";
export const addPerson = (payload) => ({ type: ADD_PERSON, payload });
