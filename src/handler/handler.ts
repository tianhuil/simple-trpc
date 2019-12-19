import { deserializeFunc, serializeResult } from '../utils'
import { IRPC, RPCRet } from '../type'

type VerifyCredentials = (credentials: string) => Promise<string | null>

export class Handler<Impl extends IRPC<Impl>> {
  public implementation: Impl
  public verifyCredentials: VerifyCredentials | undefined
  constructor(implementation: Impl, verifyCredentials?: VerifyCredentials) {
    this.implementation = implementation
    this.verifyCredentials = verifyCredentials
  }

  private async _handle(name: string, args: any[], credentials?: string): Promise<RPCRet<any>> {
    if (this.verifyCredentials) {
      if (credentials === undefined) {
        return {'error': 'Error: No credentials provided'}
      } else {
        const invalid = await this.verifyCredentials(credentials)
        if (invalid) {
          return {'error': invalid}
        }
      }
    }
    const result = this.implementation[name as keyof Impl](...args)
    return result
  }

  public async handle(arg: string, credentials?: string) {
    const { name, args } = deserializeFunc(arg)
    const result = await this._handle(name, args, credentials)
    return serializeResult<RPCRet<any>>({ name, result })
  }
}
