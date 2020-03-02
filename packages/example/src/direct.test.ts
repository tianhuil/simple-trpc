import { ExampleRPCImpl } from './impl'
import { IExampleRPC } from './interface'
import { IRpc } from '@tianhuil/simple-trpc-core'
import { makeClient, Connector } from '@tianhuil/simple-trpc-client'
import { Handler } from '@tianhuil/simple-trpc-server'
import { testClientAll } from './utils'

export function directConnector<Impl extends IRpc<Impl>>(
  handler: Handler<Impl>,
): Connector {
  return handler.handle.bind(handler)
}

const impl = new ExampleRPCImpl()
const handler = new Handler<IExampleRPC>(impl)
const client = makeClient<IExampleRPC>(directConnector(handler))

describe('Direct tests', () => {
  testClientAll(client)
})
