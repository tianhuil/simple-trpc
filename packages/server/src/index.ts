import { IRpc, IRpcRet, deserializeFunc, serializeResult } from '@tianhuil/simple-trpc-core'

export class Handler<Impl extends IRpc<Impl>> {

  public impl: Impl
  constructor(impl: Impl) {
    this.impl = impl
  }

  public async handle(arg: string) {
    const { name, args } = deserializeFunc(arg)
    const result = await this.impl[name as keyof Impl](...args)
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return serializeResult<IRpcRet<any>>({ result })
  }
}
