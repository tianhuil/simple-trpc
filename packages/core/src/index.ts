export interface IData<T> {
  type: 'data'
  data: T
}

export interface IError {
  type: 'error'
  message: string
  traceback?: string
}

export const DEFAULT_PATH = '/trpc'

export type IRpcRet<T> = IData<T> | IError

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type IRpc<Self> = Record<keyof Self, (...args: any[]) => Promise<IRpcRet<any>>>

export { serializeFunc, deserializeFunc, serializeResult, deserializeResult } from './serialize'
export { error, data } from './util'
