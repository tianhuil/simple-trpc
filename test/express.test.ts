import express from 'express'
import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { httpConnector, makeClient } from '../src/client'
import { registerHandler } from '../src/handler/express'
import { testClient } from './utils'

const PORT = 9482
const implementation = new RPCImpl()
const app: express.Application = express()
registerHandler(app, implementation)
const server = app.listen(PORT)

const client = makeClient<IRPC>(httpConnector(`http://localhost:${PORT}/`))

testClient('Express tests', client)

afterAll(() => {
  server.close()
})
