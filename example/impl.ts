import { data, error } from '../src/util'
import { IExampleRPC } from './interface'
import { ImplRpc } from '../src/type'
 
export class ExampleRPCImpl implements ImplRpc<IExampleRPC, any> {
  public hello = async (name: string) => data(`Hello World, ${name}`)
  public add = async (x: number, y: number) => data(x + y)
  public user = async (id: number) => data({id, name: 'Bob ' + id})
  public error = async () => error('error')
}
