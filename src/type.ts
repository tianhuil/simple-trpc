export interface IData<T> {
  data: T
}

export interface IError {
  error: string
  tradeback?: string
}

export type PromiseReturn<T> = Promise<IData<T> | IError>

export type IRPC<T> = Record<keyof T, (...args: any[]) => PromiseReturn<any>>
