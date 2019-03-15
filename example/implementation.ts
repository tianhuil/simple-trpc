import { RPC } from './interface'

export class RPCImpl implements RPC {
  async hello(name: string): Promise<string> {
    return `Hello World, ${name}`
  }
  async add(x: number, y: number): Promise<number> {
    return x + y
  }
}
