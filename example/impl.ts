import { data, error } from '../src/util'
import { IExampleRPC } from './interface'

export class ExampleRPCImpl implements IExampleRPC {
  public arithmetic {
    public add = async (x: number, y: number) => data(x + y)
  }
  public hello = async (name: string) => data(`Hello World, ${name}`)
  public user = async (id: number) => data({id, name: 'Bob ' + id})
  public error = async () => error('error')
}
