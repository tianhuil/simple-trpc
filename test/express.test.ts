import express from 'express'
import { ExampleRPCImpl } from '../example/implementation'
import { IExampleRPC } from '../example/interface'
import { httpConnector, makeClient } from '../src/client'
import { registerExpressHandler } from '../src/handler/express'
import { testClient } from './utils'

const implementation = new ExampleRPCImpl()

describe('Express Default Endpoint', () => {
  const PORT = 9482

  const app: express.Application = express()
  registerExpressHandler(app, implementation)
  const server = app.listen(PORT)

  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`))

  testClient(client)

  afterAll(() => {
    server.close()
  })
})

describe('Express Alternative Endpoint', () => {
  const PORT = 9481

  const app: express.Application = express()
  registerExpressHandler(app, implementation, '/anotherPath')
  const server = app.listen(PORT)

  const client = makeClient<IExampleRPC>(httpConnector(`http://localhost:${PORT}/`, '/anotherPath'))

  testClient(client)

  afterAll(() => {
    server.close()
  })
})
