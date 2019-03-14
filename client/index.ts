import { RPC } from '../common/interface'
import { Server } from '../lib/server'
import { Client } from '../lib/client'

class RPCImpl implements RPC {
  async hello(name: string): Promise<string> {
    return `Hello World, ${name}`
  }
}

const implementation = new RPCImpl()
const server = new Server<RPC>(implementation)
const client = Client<RPC>(server)
client.hello("hi").then((value) => console.log(value))


