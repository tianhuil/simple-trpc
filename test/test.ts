/* tslint:disable:no-console */

import { Client, directConnector } from '../src/client'
import { Handler } from '../src/handler'

interface IRPC {
  hello(name: string): Promise<string>
  add(x: number, y: number): Promise<number>
}

class RPCImpl implements IRPC {
  public async hello(name: string): Promise<string> {
    return `Hello World, ${name}`
  }
  public async add(x: number, y: number): Promise<number> {
    return x + y
  }
}

const implementation = new RPCImpl()
const handler = new Handler<IRPC>(implementation)
const client = Client<IRPC>(directConnector(handler))
client.hello('Bob').then((val) => console.assert(val === 'Hello World, Bob'))
client.add(1, 2).then((val) => console.assert(val === 3))
