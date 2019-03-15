import { deserializeFunc, serializeResult } from '../utils'

export class Handler<T extends object> {
  public implementation: T
  constructor(implementation: T) {
    this.implementation = implementation
  }
  public async handle(arg: string) {
    const { name, args } = deserializeFunc(arg)
    const result = await (this.implementation as any)[name](...args)
    return serializeResult<T>({ name, result })
  }
}
