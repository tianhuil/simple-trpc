export interface IData<T> {
  data: T
}

export interface IError {
  error: string
  traceback?: string
}

export type RpcRet<T> = IData<T> | IError

export type IRpc<Self> = Record<keyof Self, (...args: any[]) => Promise<RpcRet<any>>>
