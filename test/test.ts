import { Server } from '../lib/server'
import { Client, directConnector } from '../lib/client'

interface RPC {
  hello(name: string): Promise<string>
  add(x: number, y: number): Promise<number>
}

class RPCImpl implements RPC {
  async hello(name: string): Promise<string> {
    return `Hello World, ${name}`
  }
  async add(x: number, y: number): Promise<number> {
    return x + y
  }
}

const implementation = new RPCImpl()
const server = new Server<RPC>(implementation)
const client = Client<RPC>(directConnector(server))
client.hello("Bob").then((val) => console.assert(val === "Hello World, Bob"))
client.add(1, 2).then((val) => console.assert(val === 3))
