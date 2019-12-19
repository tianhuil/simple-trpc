import { deserializeFunc, serializeResult } from '../utils'
import { IRPC, RPCRet } from '../type'

type VerifyCredentials = (credentials: string) => Promise<string | null>

export class Handler<Impl extends IRPC<Impl>> {
  public impl: Impl
  public verifyCredentials: VerifyCredentials | undefined
  constructor(impl: Impl, verifyCredentials?: VerifyCredentials) {
    this.impl = impl
    this.verifyCredentials = verifyCredentials
  }

  private async _handle(name: string, args: any[], credentials?: string): Promise<RPCRet<any>> {
    if (this.verifyCredentials) {
      if (credentials === undefined) {
        return {'error': 'No credentials provided'}
      } else {
        const invalid = await this.verifyCredentials(credentials)
        if (invalid) {
          return {'error': invalid}
        }
      }
    }
    const result = this.impl[name as keyof Impl](...args)
    return result
  }

  public async handle(arg: string, credentials?: string) {
    const { name, args } = deserializeFunc(arg)
    const result = await this._handle(name, args, credentials)
    return serializeResult<RPCRet<any>>({ name, result })
  }
}
