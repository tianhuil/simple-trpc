/* tslint:disable:no-console */

import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { registerHandler } from '../src/handler/koa'
import { RPCImpl } from './implementation'
import { IRPC } from './interface'

const port = 4001

const implementation = new RPCImpl()

const app = new Koa()
const router = new Router()

router
  .get('/', async ({response}: Koa.Context) => {
    response.body = 'Hello World!'
  })

registerHandler<IRPC>(app, router, implementation)

app.use(router.routes())
app.listen(port, () => console.log(`Koa app listening on port ${port}!`))
