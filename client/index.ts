import { RPC } from '../common/interface'
import { Server } from '../lib/server'
import { Client } from '../lib/client'

class RPCImpl implements RPC {
  hello(name: string): string {
    return `Hello World, ${name}`
  }
}

const implementation = new RPCImpl()
const server = new Server<RPC>(implementation)
const client = Client<RPC>(server)
console.log(client.hello("hi"))

