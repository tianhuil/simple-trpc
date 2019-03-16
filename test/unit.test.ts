import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { Client, directConnector } from '../src/client'
import { Handler } from '../src/handler'
import { testClient } from './utils'

const implementation = new RPCImpl()
const handler = new Handler<IRPC>(implementation)
const client = Client<IRPC>(directConnector(handler))

testClient('Unit tests', client)
