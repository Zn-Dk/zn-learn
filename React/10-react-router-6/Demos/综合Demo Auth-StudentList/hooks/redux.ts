import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AuthState, AppDispatch } from '@/store'
import { clearUserState, setUserState, type UserResp } from '@/store/slices/auth'

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
interface IHandler {
  (type: TM): void // 无参数  无callback
  (type: TM, callback: VoidFunction): void // 无参数  有callback
  (type: TM, opts: UserResp, callback?: VoidFunction): void // 有参数 有callback
}

export const useMydispatch = () => {
  const dispatch = useAppDispatch()

  const handler: IHandler = (type: TM, opts?: object, callback?: VoidFunction) => {
    const isCbFn = typeof callback === 'function'
    const isOptFn = typeof opts === 'function'
    if (!opts && !isCbFn && !isOptFn) {
      dispatch(MUTATION[type]())
      return
    }
    if (isOptFn) {
      dispatch(MUTATION[type]())
      opts()
      return
    }
    dispatch(MUTATION[type](opts))
    isCbFn && callback()
  }
  return handler
}
