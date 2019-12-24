import { IData, IError } from './type'

export const DEFAULT_PATH = '/trpc'

/* tslint:disable:object-literal-sort-keys */
export const error = (message: string, traceback?: string): IError => ({
  type: 'error',
  message,
  traceback,
})

export const data = <T>(d: T): IData<T> => ({
  type: 'data',
  data: d,
})
