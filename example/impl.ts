/* eslint-disable @typescript-eslint/no-explicit-any */
import { data, error } from '../src/util'
import { IExampleRPC } from './interface'
import { ImplRpc } from '../src/type'

export const sideEffect = async (): Promise<void> => { return }
 
export class ExampleRPCImpl<Augmenter> implements ImplRpc<IExampleRPC, Augmenter> {
  public hello = async (name: string) => data(`Hello World, ${name}`)
  public add = async (x: number, y: number) => data(x + y)
  public user = async (id: number) => {
    if (id > 0) {
      return data({id, name: 'Bob ' + id})
    } else {
      return error('invalid Id')
    }
  }
  public continuation = async () => {
    await sideEffect()
    return data(1, sideEffect)
  }
  public augmenter = async (a?: Augmenter) => data(String(a))
  public error = async () => error('error')
}
