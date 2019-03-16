import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { directConnector, makeClient } from '../src/client'
import { Handler } from '../src/handler/handler'
import { testClient } from './utils'

const implementation = new RPCImpl()
const handler = new Handler<IRPC>(implementation)
const client = makeClient<IRPC>(directConnector(handler))

testClient('Unit tests', client)
