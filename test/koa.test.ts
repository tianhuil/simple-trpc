import Koa from 'koa'
import Router from 'koa-router'
import { ExampleRPCImpl } from '../example/implementation'
import { IExampleRPC } from '../example/interface'
import { httpConnector, makeClient } from '../src/client'
import { registerKoaHandler } from '../src/handler/koa'
import { testClient } from './utils'

const implementation = new ExampleRPCImpl()

describe('Koa Default Endpoint', () => {
  const PORT = 4850
  const app = new Koa()
  registerKoaHandler(app, implementation)
  const server = app.listen(PORT)
  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`))

  testClient(client)

  afterAll(() => {
    server.close()
  })
})

describe('Koa Alternative Endpoint', () => {
  const PORT = 4851
  const app = new Koa()
  registerKoaHandler(app, implementation, '/anotherPath')
  const server = app.listen(PORT)
  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`, '/anotherPath'))

  testClient(client)

  afterAll(() => {
    server.close()
  })
})
