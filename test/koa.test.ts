import Koa from 'koa'
import Router from 'koa-router'
import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { Client, httpConnector } from '../src/client'
import { registerHandler } from '../src/handler/koa'
import { testClient } from './utils'

const PORT = 4850

beforeAll(() => {
  const implementation = new RPCImpl()
  const app = new Koa()
  const router = new Router()
  registerHandler(app, router, implementation)
  app.use(router.routes())
  app.listen(PORT)
})

const client = Client<IRPC>(httpConnector(`http://localhost:${PORT}/rpc`))

testClient('Koa tests', client)
