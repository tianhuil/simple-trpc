import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { IRpc, DEFAULT_PATH } from '@tianhuil/simple-trpc-core'
import { Handler } from '@tianhuil/simple-trpc-server'


export interface IKoaHandlerOptions {
  path?: string
  textBodyParser?: boolean
}

const defaultOptions = {
  path: DEFAULT_PATH,
  textBodyParser: true,
}

export function registerKoaHandler<Impl extends IRpc<Impl>>(
  app: Koa,
  implementation: Impl,
  options: IKoaHandlerOptions = {},
): Koa {
  const {path, textBodyParser} = {...defaultOptions, ...options}

  if (textBodyParser) {
    app.use(bodyParser({
      enableTypes: ['text'],
    }))
  }

  const handler = new Handler<Impl>(implementation)
  const router = new Router()

  router.post(path, async ({request, response}: Koa.Context) => {
    response.body = await handler.handle(request.body as string)
  })
  app.use(router.routes())

  return app
}
