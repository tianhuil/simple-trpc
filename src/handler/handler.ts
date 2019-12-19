import { deserializeFunc, serializeResult } from '../utils'
import { IRPC, RPCRet, IError } from '../type'

export class Handler<Impl extends IRPC<Impl>> {
  public impl: Impl
  constructor(impl: Impl) {
    this.impl = impl
  }

  public async handle(arg: string) {
    const { name, args } = deserializeFunc(arg)
    const result = await this.impl[name as keyof Impl](...args)
    return serializeResult<RPCRet<any>>({ name, result })
  }

  // Helper function to serialize error
  public static serializeError(arg: string, error: IError) {
    const { name } = deserializeFunc(arg)
    return serializeResult<RPCRet<any>>({ name, result: error })
  }
}
