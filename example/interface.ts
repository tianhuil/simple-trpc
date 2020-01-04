import { IRpc, RpcRet } from '../src/type'

export interface IUser {
  id: number
  name: string
}

export interface IExampleRPC extends IRpc {
  arithmetic: {
    add(x: number, y: number): Promise<RpcRet<number>>
  }
  hello(name: string): Promise<RpcRet<string>>
  user(id: number): Promise<RpcRet<IUser>>
  error(): Promise<RpcRet<null>>
}
