import express from 'express'
import { ExampleRPCImpl } from './impl'
import { IExampleRPC } from './interface'
import { httpConnector, IHttpConnectorOptions, makeClient } from '@tianhuil/simple-trpc-client'
import { IExpressHandlerOptions, registerExpressHandler } from '@tianhuil/simple-trpc-express'
import { testClientAll, testClientHello } from './utils'

const impl = new ExampleRPCImpl()

function makeServerHelper(port: number, options?: IExpressHandlerOptions) {
  const app: express.Application = express()
  registerExpressHandler(app, impl, options)
  return app.listen(port)
}

function makeClientHelper(port: number, options?: IHttpConnectorOptions) {
  return makeClient<IExampleRPC>(httpConnector(`http://localhost:${port}/`, options))
}

describe('Express Test All Methods', () => {
  const PORT = 9480
  const server = makeServerHelper(PORT)
  const client = makeClientHelper(PORT)

  testClientAll(client)

  afterAll(() => { server.close() })
})

describe('Express Alternative Endpoint', () => {
  const PORT = 9481
  const server = makeServerHelper(PORT, {path: '/anotherPath'})
  const client = makeClientHelper(PORT, {path: '/anotherPath'})

  testClientHello(client)

  afterAll(() => { server.close() })
})