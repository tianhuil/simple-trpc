import { deserializeFunc, serializeResult } from '../serialize'
import { IRpc, RpcRet } from '../type'

export class Handler<Impl extends IRpc<Impl>, Request> {

  public impl: Impl
  constructor(impl: Impl) {
    this.impl = impl
  }

  public async handle(serializedCall: string, request: Request) {
    const { name, args } = deserializeFunc(serializedCall)
    const result = await this.impl[name as keyof Impl](...[...args, request])
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return serializeResult<RpcRet<any>>({ result })
  }
}
