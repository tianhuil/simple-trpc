import { List } from 'ts-toolbelt'

export interface IData<T> {
  type: 'data'
  data: T
}

export interface IError {
  type: 'error'
  message: string
  traceback?: string
}

export type RpcRet<T> = IData<T> | IError

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type RpcFunc = (...args: any[]) => Promise<RpcRet<any>>

type AppendFunction<Func extends (...args: any[]) => any, A> =
  Func extends (...args: infer P) => infer R
    ? (...args: List.Append<P, A>) => R
    : never

export type IRpc<Self> = {
  [K in keyof Self]: RpcFunc
}

export type ImplRpc<Self extends IRpc<Self>, T> = {
  [K in keyof Self]: AppendFunction<Self[K], T>
}
