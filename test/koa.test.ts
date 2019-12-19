import Koa from 'koa'
import { ExampleRPCImpl } from '../example/impl'
import { IExampleRPC } from '../example/interface'
import { httpConnector, makeClient } from '../src/client'
import { registerKoaHandler } from '../src/handler/koa'
import { testClientAll, testClientHello } from './utils'

const impl = new ExampleRPCImpl()

describe('Koa Default Endpoint', () => {
  const PORT = 4850
  const app = new Koa()
  registerKoaHandler(app, impl)
  const server = app.listen(PORT)
  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`))

  testClientAll(client)

  afterAll(() => {
    server.close()
  })
})

describe('Koa Alternative Endpoint', () => {
  const PORT = 4851
  const app = new Koa()
  registerKoaHandler(app, impl, {path: '/anotherPath'})
  const server = app.listen(PORT)
  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`, '/anotherPath'))

  testClientHello(client)

  afterAll(() => {
    server.close()
  })
})
