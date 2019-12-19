import Koa from 'koa'
import { ExampleRPCImpl } from '../example/impl'
import { IExampleRPC } from '../example/interface'
import { httpConnector, IHttpConnectorOptions, makeClient } from '../src/client'
import { IKoaHandlerOptions, registerKoaHandler } from '../src/handler/koa'
import { testClientAll, testClientHello } from './utils'

const impl = new ExampleRPCImpl()

function makeServerHelper(port: number, options?: IKoaHandlerOptions) {
  const app = new Koa()
  registerKoaHandler(app, impl, options)
  return app.listen(port)
}

function makeClientHelper(port: number, options?: IHttpConnectorOptions) {
  return makeClient<IExampleRPC>(httpConnector(`http://localhost:${port}/`, options))
}

describe('Koa Default Endpoint', () => {
  const PORT = 4850
  const server = makeServerHelper(PORT)
  const client = makeClientHelper(PORT)

  testClientAll(client)

  afterAll(() => { server.close() })
})

describe('Koa Alternative Endpoint', () => {
  const PORT = 4851
  const server = makeServerHelper(PORT, {path: '/anotherPath'})
  const client = makeClientHelper(PORT, {path: '/anotherPath'})

  testClientHello(client)

  afterAll(() => { server.close() })
})
