import { deserializeFunc, serializeResult } from '../serialize'
import { IRpc, RpcRet } from '../type'

export class Handler<Impl extends IRpc> {
  public impl: Impl
  constructor(impl: Impl) {
    this.impl = impl
  }

  private call(obj: any, names: string[]): any {
    if (names.length == 0) {
      return obj
    } else {
      const [name, ...tail] = names
      return this.call(obj[name], tail)
    }
  }

  public async handle(arg: string) {
    const { names, args } = deserializeFunc(arg)
    const func = this.call(this.impl, names)
    const result = await func(...args)
    return serializeResult<RpcRet<any>>({ result })
  }
}
