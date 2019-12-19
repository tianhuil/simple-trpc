import { IRPC, Return } from '../src/type'

export interface IUser {
  id: number
  name: string
}

export interface IExampleRPC extends IRPC<IExampleRPC> {
  hello(name: string): Promise<Return<string>>
  add(x: number, y: number): Promise<Return<number>>
  user(id: number): Promise<Return<IUser>>
  error(): Promise<Return<null>>
}
