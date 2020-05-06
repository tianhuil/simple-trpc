import { List } from 'ts-toolbelt'

/* eslint-disable @typescript-eslint/no-explicit-any */
export interface IData<T> {
  type: 'data'
  data: T
}

export interface IError {
  type: 'error'
  message: string
}

export type Continuation = () => Promise<void>
export type ContinuationObject = { continuation?: Continuation }
export type Continued<T> = T extends any ? T & ContinuationObject : never

export type RpcRet<T> = (IData<T> | IError)
export type RpcFunc = (...args: any[]) => Promise<RpcRet<any>>

export type ImplRpcRet<T> = Continued<RpcRet<T>>
export type ImplRpcFunc = (...args: any[]) => Promise<ImplRpcRet<any>>

type AppendArg<Func extends (...args: any[]) => any, A> =
  Func extends (...args: infer P) => infer R
    ? (...args: List.Prepend<P, A>) => R
    : never

type AugmentReturn<Func extends (...args: any[]) => Promise<any>, C> =
  Func extends (...args: infer P) => Promise<infer R>
    ? (...args: P) => Promise<R & C>
    : never

export type IRpc<Interface> = {
  [K in keyof Interface]: RpcFunc
}

export type ImplRpc<Interface extends IRpc<Interface>, T> = {
  [K in keyof Interface]: AugmentReturn<AppendArg<Interface[K], T>, ContinuationObject>
}
