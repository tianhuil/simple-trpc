import express from 'express'
import { ExampleRPCImpl } from '../example/impl'
import { IExampleRPC } from '../example/interface'
import { httpConnector, makeClient } from '../src/client'
import { registerExpressHandler } from '../src/handler/express'
import { testClientAll, testClientHello } from './utils'

const impl = new ExampleRPCImpl()

describe('Express Default Endpoint', () => {
  const PORT = 9482

  const app: express.Application = express()
  registerExpressHandler(app, impl)
  const server = app.listen(PORT)

  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`))

  testClientAll(client)

  afterAll(() => {
    server.close()
  })
})

describe('Express Alternative Endpoint', () => {
  const PORT = 9481

  const app: express.Application = express()
  registerExpressHandler(app, impl, {path: '/anotherPath'})
  const server = app.listen(PORT)

  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`, '/anotherPath'))

  testClientHello(client)

  afterAll(() => {
    server.close()
  })
})
