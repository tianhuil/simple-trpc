import Koa from 'koa'
import Router from 'koa-router'

import { registerKoaHandler } from '@tianhuil/simple-trpc'
import { ExampleRPCImpl } from './impl'

const port = 4001

const impl = new ExampleRPCImpl<Koa.Request>()

const app = new Koa()
const router = new Router()

router
  .get('/', async ({response}: Koa.Context) => {
    response.body = 'Hello World!'
  })

registerKoaHandler(app, impl)

app.use(router.routes())
app.listen(port, () => console.log(`Koa app listening on port ${port}!`))
