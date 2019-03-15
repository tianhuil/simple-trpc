/* tslint:disable:no-console */

import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { Client, directConnector } from '../src/client'
import { Handler } from '../src/handler'

const implementation = new RPCImpl()
const handler = new Handler<IRPC>(implementation)
const client = Client<IRPC>(directConnector(handler))
client.hello('Bob').then((val) => console.assert(val === 'Hello World, Bob'))
client.add(1, 2).then((val) => console.assert(val === 3))
