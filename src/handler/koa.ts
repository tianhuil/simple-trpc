import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { IRpc } from '../type'
import { DEFAULT_PATH } from '../util'
import { Handler } from './handler'

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

  const handler = new Handler<Impl, Koa.Request>(implementation)
  const router = new Router()

  router.post(path, async ({request, response}: Koa.Context) => {
    response.body = await handler.handle(request.body as string, request)
  })
  app.use(router.routes())

  return app
}
