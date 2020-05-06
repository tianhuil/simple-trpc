import { IData, IError, Continued } from './type'

export const DEFAULT_PATH = '/trpc'

export const error = (message: string, continuation?: () => Promise<void>): Continued<IError> => ({
  type: 'error',
  message,
  continuation,
})

export const data = <T>(data: T, continuation?: () => Promise<void>): Continued<IData<T>> => ({
  type: 'data',
  data,
  continuation,
})
