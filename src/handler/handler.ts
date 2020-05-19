import { deserializeFunc, serializeResult } from '../serialize'
import { IRpc, ImplRpc } from '../type'

export class Handler<Interface extends IRpc<Interface>, A> {

  public impl: ImplRpc<Interface, A>
  constructor(impl: ImplRpc<Interface, A>) {
    this.impl = impl
  }

  public async handle(serializedCall: string, augmenter: A) {
    const { name, args } = deserializeFunc(serializedCall)
    const method = this.impl[name as keyof Interface]
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const ret = await method(augmenter, ...args)
    const { continuation, ...result } = ret
    return {
      result: serializeResult({ result }),
      continuation,
    }
  }
}
