const serialize = <T>(x: T): string => JSON.stringify(x)

const deserialize = <T>(text: string): T => JSON.parse(text) as T

export interface IFuncCall {
  name: string
  args: any[]  // eslint-disable-line @typescript-eslint/no-explicit-any
}

export const serializeFunc = ({name, args}: IFuncCall): string => serialize({name, args})

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
