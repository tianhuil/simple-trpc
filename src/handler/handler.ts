import { IError, IRpc, RpcRet } from '../type'
import { deserializeFunc, serializeResult } from '../utils'

export class Handler<Impl extends IRpc<Impl>> {

  // Helper function to serialize error
  public static serializeError(arg: string, error: IError) {
    const { name } = deserializeFunc(arg)
    return serializeResult<RpcRet<any>>({ name, result: error })
  }
  public impl: Impl
  constructor(impl: Impl) {
    this.impl = impl
  }

  public async handle(arg: string) {
    const { name, args } = deserializeFunc(arg)
    const result = await this.impl[name as keyof Impl](...args)
    return serializeResult<RpcRet<any>>({ name, result })
  }
}
