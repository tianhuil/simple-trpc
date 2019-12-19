export interface IData<T> {
  data: T
}

export interface IError {
  error: string
  tradeback?: string
}

export type Return<T> = IData<T> | IError

export type IRPC<Self> = Record<keyof Self, (...args: any[]) => Promise<Return<any>>>
