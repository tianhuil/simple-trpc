type ParamType<T> = T extends (a: infer A) => any ? A : 
                    T extends (a: infer A, b: infer B) => any ? [A, B] :
                    T extends (a: infer A, b: infer B, c: infer C) => any ? [A, B, C] :
                    T extends (a: infer A, b: infer B, c: infer C, d: infer D) => any ? [A, B, C, D] :
                    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E) => any ? [A, B, C, D, E] : never

export const serialize = <T>(x: T): string => JSON.stringify(x)

export const deserialize = <T>(text: string): T => JSON.parse(text) as T

interface FuncCall {
  name: string
  args: any[]
}

const serializeFunc = ({name, args}: FuncCall): string => serialize({name, args})

const deserializeFunc = (text: string): FuncCall => deserialize(text)

interface FuncReturn<T> {
  name: string
  value: T
}

function serializeResult<T>({name, value}: FuncReturn<T>): string {
  return serialize({name, value})
}

function deserializeResult<T>(text: string): FuncReturn<T> {
  return deserialize(text)
}

export class Server<T extends object> {
  implementation: T
  constructor(implementation: T) {
    this.implementation = implementation
  }

  handle(text: string) {
    const { name, args } = deserializeFunc(text)
    const method = (this.implementation as any)[name]
    const value = method(...args)
    return serializeResult<T>({name, value})
  }
}


export function Client<T extends object>(server: Server<T>):T {
  const proxy = new Proxy({}, {
    get(a, name: string) {
      return function(...args: any[]) {
        const input = serializeFunc({name, args})
        const response = server.handle(input)
        return deserializeResult(response)
      }
    },
  }) as any
  return proxy as T
}
