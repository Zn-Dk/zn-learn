import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AuthState, AppDispatch } from '@/store'
import { clearUserState, setUserState } from '@/store/slices/auth'

// 导出TS兼容的 dispatch 和 selector hooks
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AuthState> = useSelector

// useMydispatch 实现 TS 调用 dispatch
const MUTATION = {
  clearUserState: clearUserState,
  setUserState: setUserState,
}
// type ReduxAction = ActionCreatorWithoutPayload | ActionCreatorWithPayload<unknown, string>
// type GetActionType<
//   A extends ReduxAction,
//   K extends keyof typeof MUTATION,
// > = typeof MUTATION[K] extends infer U ? U : A
// type W1 = GetActionType<ActionCreatorWithoutPayload, 'clearUserState'>

type TM = keyof typeof MUTATION
export const useMydispatch = () => {
  const dispatch = useAppDispatch()
  function handler(type: TM, opts?: object): void // 无参数  无callback
  function handler(type: TM, opts?: VoidFunction): void // 无参数  有callback
  function handler(type: TM, opts?: object, callback?: VoidFunction): void // 有参数 有callback
  function handler(type: TM, opts?: object, callback?: VoidFunction) {
    const isOptsFn = typeof opts === 'function'
    const isCbFn = typeof callback === 'function'
    if (!opts) {
      dispatch(MUTATION[type]())
      return
    }
    if (isOptsFn) {
      dispatch(MUTATION[type]())
      opts()
      return
    }
    dispatch(MUTATION[type](opts))
    isCbFn && callback()
  }
  return handler
}
