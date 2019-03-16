/* tslint:disable:no-console */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { Handler } from '../src/handler'
import { RPCImpl } from './implementation'
import { IRPC } from './interface'

const port = 4001

const implementation = new RPCImpl()

const app = new Koa()
app.use(bodyParser({
  enableTypes: ['text'],
}))
const router = new Router()
const handler = new Handler<IRPC>(implementation)

router
  .get('/', async ({response}: Koa.Context) => {
    response.body = 'Hello World!'
  })
  .post('/rpc', async ({request, response}: Koa.Context) => {
    const result = await handler.handle(request.body as string)
    response.body = result
  })

app.use(router.routes())
app.listen(port, () => console.log(`Koa app listening on port ${port}!`))
