import { IRPC, IUser } from './interface'

export class RPCImpl implements IRPC {
  public hello = async (name: string) => `Hello World, ${name}`
  public add = async (x: number, y: number) => x + y
  public user = async (id: number) => ({
    id,
    name: 'Bob ' + id,
  })
}
