import { type TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AuthState, AppDispatch } from '@/store'

// 导出TS兼容的 dispatch 和 selector hooks
// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch: () => AppDispatch = useDispatch
export const useAppSelector: TypedUseSelectorHook<AuthState> = useSelector
