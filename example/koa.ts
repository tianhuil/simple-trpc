/* tslint:disable:no-console */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { registerKoaHandler } from '@tianhuil/simple-trpc'
import { ExampleRPCImpl } from './implementation'
import { IExampleRPC } from './interface'

const port = 4001

const implementation = new ExampleRPCImpl()

const app = new Koa()
const router = new Router()

router
  .get('/', async ({response}: Koa.Context) => {
    response.body = 'Hello World!'
  })

registerKoaHandler<IExampleRPC>(app, implementation)

app.use(router.routes())
app.listen(port, () => console.log(`Koa app listening on port ${port}!`))
