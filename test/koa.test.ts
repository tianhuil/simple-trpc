import Koa from 'koa'
import Router from 'koa-router'
import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { httpConnector, makeClient } from '../src/client'
import { registerKoaHandler } from '../src/handler/koa'
import { testClient } from './utils'

const PORT = 4850

const implementation = new RPCImpl()
const app = new Koa()
const router = new Router()
registerKoaHandler(app, implementation)
app.use(router.routes())
const server = app.listen(PORT)

const client = makeClient<IRPC>(httpConnector(`http://localhost:${PORT}/`))

describe('Koa tests', () => {
  testClient(client)
})

afterAll(() => {
  server.close()
})
