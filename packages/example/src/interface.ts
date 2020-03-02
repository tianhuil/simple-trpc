import { IRpc, IRpcRet } from '@tianhuil/simple-trpc-core'

export interface IUser {
  id: number
  name: string
}

export interface IExampleRPC extends IRpc<IExampleRPC> {
  hello(name: string): Promise<IRpcRet<string>>
  add(x: number, y: number): Promise<IRpcRet<number>>
  user(id: number): Promise<IRpcRet<IUser>>
  error(): Promise<IRpcRet<null>>
}
