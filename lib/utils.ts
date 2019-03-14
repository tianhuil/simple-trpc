export const serialize = <T>(x: T): string => JSON.stringify(x)

export const deserialize = <T>(text: string): T => JSON.parse(text) as T

interface FuncCall {
  name: string
  args: any[]
}

export const serializeFunc = ({name, args}: FuncCall): string => serialize({name, args})

export const deserializeFunc = (text: string): FuncCall => deserialize(text)

interface FuncReturn<T> {
  name: string
  value: T
}

export function serializeResult<T>({name, value}: FuncReturn<T>): string {
  return serialize({name, value})
}

export function deserializeResult<T>(text: string): FuncReturn<T> {
  return deserialize(text)
}


