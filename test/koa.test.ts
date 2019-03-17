import Koa from 'koa'
import Router from 'koa-router'
import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { httpConnector, makeClient } from '../src/client'
import { registerKoaHandler } from '../src/handler/koa'
import { testClient } from './utils'

const implementation = new RPCImpl()

describe('Koa Default Endpoint', () => {
  const PORT = 4850
  const app = new Koa()
  registerKoaHandler(app, implementation)
  const server = app.listen(PORT)
  const client = makeClient<IRPC>(httpConnector(`http://localhost:${PORT}/`))

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
  const client = makeClient<IRPC>(httpConnector(`http://localhost:${PORT}/`, '/anotherPath'))

  testClient(client)

  afterAll(() => {
    server.close()
  })
})

