import { IData, IError } from '.'



export const error = (message: string, traceback?: string): IError => ({
  type: 'error',
  message,
  traceback,
})

export const data = <T>(d: T): IData<T> => ({
  type: 'data',
  data: d,
})
