/* eslint-disable @typescript-eslint/no-explicit-any */
import { data, error } from '../src/util'
import { IExampleRPC } from './interface'
import { ImplRpc } from '../src/type'

export const sideEffect = async (): Promise<void> => { return }
 
export class ExampleRPCImpl implements ImplRpc<IExampleRPC, any> {
  public hello = async (_: any, name: string) => data(`Hello World, ${name}`)
  public add = async (_: any, x: number, y: number) => data(x + y)
  public user = async (_: any, id: number) => {
    if (id > 0) {
      return data({id, name: 'Bob ' + id})
    } else {
      return error('invalid Id')
    }
  }
  public continuation = async (_: any) => {
    await sideEffect()
    return data(1, sideEffect)
  }
  public augmenter = async (a: any) => data(a)
  public error = async () => error('error')
}
