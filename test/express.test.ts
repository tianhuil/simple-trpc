import express from 'express'
import { ExampleRPCImpl } from '../example/impl'
import { IExampleRPC } from '../example/interface'
import { httpConnector, IHttpConnectorOptions, makeClient } from '../src/client'
import { IExpressHandlerOptions, registerExpressHandler } from '../src/handler/express'
import { testClientAll, testClientHello } from './utils'

const impl = new ExampleRPCImpl()

function makeServerHelper(port: number, options?: IExpressHandlerOptions) {
  const app: express.Application = express()
  registerExpressHandler(app, impl, options)
  return app.listen(port)
}

function makeClientHelper(port: number, options?: IHttpConnectorOptions) {
  return makeClient<IExampleRPC>(httpConnector(`http://localhost:${port}/`, options))
}

describe('Express Test All Methods', () => {
  const PORT = 9480
  const server = makeServerHelper(PORT)
  const client = makeClientHelper(PORT)

  testClientAll(client)

  afterAll(() => { server.close() })
})

describe('Express Alternative Endpoint', () => {
  const PORT = 9481
  const server = makeServerHelper(PORT, {path: '/anotherPath'})
  const client = makeClientHelper(PORT, {path: '/anotherPath'})

  testClientHello(client)

  afterAll(() => { server.close() })
})

describe('Express Authorization Required', () => {
  const PORT = 9482
  const verifyCredentials = async (req: express.Request) => {
    const auth: string | undefined = req.get('Authorization')
    if (auth === 'Bearer xxx') {
      return null
    } else {
      return 'Invalid Credentials'
    }
  }
  const server = makeServerHelper(PORT, {verifyCredentials})
  const unauthorizedClient = makeClientHelper(PORT)
  const authorizedClient = makeClientHelper(PORT, {auth: 'xxx'})

  test('test helllo world', async () => {
    expect(await unauthorizedClient.hello('Bob')).toHaveProperty('error')
    expect(await unauthorizedClient.hello('Bob')).not.toHaveProperty('data')
  })

  testClientHello(authorizedClient)

  afterAll(() => { server.close() })
})
