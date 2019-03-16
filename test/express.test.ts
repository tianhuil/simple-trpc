import bodyParser from 'body-parser'
import express from 'express'
import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { Client, httpConnector } from '../src/client'
import { expressHandler } from '../src/handler/express'
import { testClient } from './utils'

const PORT = 9482

beforeAll(() => {
  const implementation = new RPCImpl()

  const app: express.Application = express()
  app.use(bodyParser.text())

  app.get('/', (_, res) => res.send('Hello World!!'))
  app.post('/rpc', expressHandler<IRPC>(implementation))

  app.listen(PORT)
})

const client = Client<IRPC>(httpConnector(`http://localhost:${PORT}/rpc`))

testClient('Express tests', client)
