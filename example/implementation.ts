import { IRPC } from './interface'

export class RPCImpl implements IRPC {
  public async hello(name: string): Promise<string> {
    return `Hello World, ${name}`
  }
  public async add(x: number, y: number): Promise<number> {
    return x + y
  }
}
