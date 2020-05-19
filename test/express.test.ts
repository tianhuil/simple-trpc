import express from 'express'
import fetch from 'node-fetch'
import { ExampleRPCImpl } from '../example/impl'
import { IExampleRPC } from '../example/interface'
import { httpConnector, IHttpConnectorOptions, makeClient } from '../src/client'
import { IExpressHandlerOptions, registerExpressHandler } from '../src/handler/express'
import { testClientAll, testClientHello } from './utils'

const impl = new ExampleRPCImpl<express.Request>()

function makeServerHelper(port: number, options?: IExpressHandlerOptions) {
  const app: express.Application = express()
  registerExpressHandler<IExampleRPC>(app, impl, options)
  return app.listen(port)
}

function makeClientHelper(port: number, options?: IHttpConnectorOptions) {
  return makeClient<IExampleRPC>(httpConnector(`http://localhost:${port}/`, options))
}

describe('Express Test All Methods', () => {
  const PORT = 9480
  const server = makeServerHelper(PORT)
  const client = makeClientHelper(PORT, { fetch })

  testClientAll(client)

  afterAll(() => { server.close() })
})

describe('Express Alternative Endpoint', () => {
  const PORT = 9481
  const server = makeServerHelper(PORT, {path: '/anotherPath', bodyParserOptions: {limit: '5MB'}})
  const client = makeClientHelper(PORT, {path: '/anotherPath', fetch})

  testClientHello(client)

  afterAll(() => { server.close() })
})
