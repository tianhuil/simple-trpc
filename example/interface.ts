import { IRpc, RpcRet } from '../src/type'

export interface IUser {
  id: number
  name: string
}

export interface IExampleRPC extends IRpc<IExampleRPC> {
  hello(name: string): Promise<RpcRet<string>>
  add(x: number, y: number): Promise<RpcRet<number>>
  user(id: number): Promise<RpcRet<IUser>>
  continuation(): Promise<RpcRet<number>>
  error(): Promise<RpcRet<null>>
}
