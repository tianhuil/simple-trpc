import { IRPC, PromiseReturn } from '../src/type'

export interface IUser {
  id: number
  name: string
}

export interface IExampleRPC extends IRPC<IExampleRPC> {
  hello(name: string): PromiseReturn<string>
  add(x: number, y: number): PromiseReturn<number>
  user(id: number): PromiseReturn<IUser>
}
