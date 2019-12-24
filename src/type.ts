export interface IData<T> {
  data: T
}

export interface IError {
  error: string
  traceback?: string
}

export type RPCRet<T> = IData<T> | IError

export type IRPC<Self> = Record<keyof Self, (...args: any[]) => Promise<RPCRet<any>>>
