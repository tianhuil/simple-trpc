import { ExampleRPCImpl } from '../example/implementation'
import { IExampleRPC } from '../example/interface'
import { directConnector, makeClient } from '../src/client'
import { Handler } from '../src/handler/handler'
import { testClientAll } from './utils'

const implementation = new ExampleRPCImpl()
const handler = new Handler<IExampleRPC>(implementation)
const client = makeClient<IExampleRPC>(directConnector(handler))

describe('Direct tests', () => {
  testClientAll(client)
})
