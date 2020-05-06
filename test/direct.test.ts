import { ExampleRPCImpl } from '../example/impl'
import { IExampleRPC } from '../example/interface'
import { directConnector, makeClient } from '../src/client'
import { Handler } from '../src/handler/handler'
import { testClientAll } from './utils'
import { data } from '../src/util'

const impl = new ExampleRPCImpl()
const handler = new Handler<IExampleRPC, number>(impl)
const client = makeClient<IExampleRPC>(directConnector(handler, 10))

describe('Direct tests', () => {
  testClientAll(client)

  test('augmenter', async () => {
    expect(await client.augmenter()).toEqual(data(10))
  })
  
})
