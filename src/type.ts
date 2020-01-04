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

export type RpcCall<T> = (...args: any[]) => Promise<RpcRet<T>>

// export type IRpc<Self> = Record<keyof Self, RpcCall<any>>
export interface IRpc  {
  [key: string]: RpcCall<any> | IRpc
}
