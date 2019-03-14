import { Client } from "../lib/client"
import { Server } from "../lib/server"

export interface RPC {
  hello(name: string): string
}

class RPCImpl implements RPC {
  hello(name: string): string {
    return `Hello World, ${name}`
  }
}

const implRPC = new RPCImpl()
const server = new Server<RPC>(implRPC)
const client = Client<RPC>(server)
console.log(client.hello("hi"))
