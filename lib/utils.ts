export const serialize = <T>(x: T): string => JSON.stringify(x)

export const deserialize = <T>(text: string): T => JSON.parse(text) as T

export interface FuncCall {
  name: string
  args: any[]
}

export const serializeFunc = ({name, args}: FuncCall): string => serialize({name, args})

export const deserializeFunc = (text: string): FuncCall => deserialize(text)

export interface FuncReturn<T> {
  name: string
  result: T
}

export function serializeResult<T>({name, result}: FuncReturn<T>): string {
  return serialize({name, result})
}

export function deserializeResult<T>(text: string): FuncReturn<T> {
  return deserialize(text)
}
