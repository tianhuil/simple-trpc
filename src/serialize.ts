const serialize = <T>(x: T): string => JSON.stringify(x)

const deserialize = <T>(text: string): T => JSON.parse(text) as T

export interface IFuncCall {
  names: string[]
  args: any[]
}

export const serializeFunc = ({names, args}: IFuncCall): string => serialize({names, args})

export const deserializeFunc = (text: string): IFuncCall => deserialize(text)

export interface IFuncReturn<T> {
  result: T
}

export function serializeResult<T>({result}: IFuncReturn<T>): string {
  return serialize({result})
}

export function deserializeResult<T>(text: string): IFuncReturn<T> {
  return deserialize(text)
}
