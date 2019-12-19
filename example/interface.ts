import { IRPC, RPCRet } from '../src/type'

export interface IUser {
  id: number
  name: string
}

export interface IExampleRPC extends IRPC<IExampleRPC> {
  hello(name: string): Promise<RPCRet<string>>
  add(x: number, y: number): Promise<RPCRet<number>>
  user(id: number): Promise<RPCRet<IUser>>
  error(): Promise<RPCRet<null>>
}
