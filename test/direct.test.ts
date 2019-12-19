import { ExampleRPCImpl } from '../example/impl'
import { IExampleRPC } from '../example/interface'
import { directConnector, makeClient } from '../src/client'
import { Handler } from '../src/handler/handler'
import { testClientAll } from './utils'

const impl = new ExampleRPCImpl()
const handler = new Handler<IExampleRPC>(impl)
const client = makeClient<IExampleRPC>(directConnector(handler))

describe('Direct tests', () => {
  testClientAll(client)
})
