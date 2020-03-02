import Koa from 'koa'
import Router from 'koa-router'

import { registerKoaHandler } from '@tianhuil/simple-trpc-koa'
import { ExampleRPCImpl } from './impl'
import { IExampleRPC } from './interface'

const port = 4001

const impl = new ExampleRPCImpl()

const app: Koa = new Koa()
const router = new Router()

router
  .get('/', async ({response}: Koa.Context) => {
    response.body = 'Hello World!'
  })

registerKoaHandler<IExampleRPC>(app, impl)

app.use(router.routes())
app.listen(port, () => console.log(`Koa app listening on port ${port}!`))
