import { deserializeFunc, serializeResult } from '../serialize'
import { IRpc, RpcRet } from '../type'

export class Handler<Impl extends IRpc<Impl>> {

  public impl: Impl
  constructor(impl: Impl) {
    this.impl = impl
  }

  public async handle(arg: string) {
    const { name, args } = deserializeFunc(arg)
    const result = await this.impl[name as keyof Impl](...args)
    return serializeResult<RpcRet<any>>({ result })
  }
}
