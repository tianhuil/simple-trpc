import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { Handler } from '.'
import { DEFAULT_PATH } from '../utils'

export function registerHandler<T extends object>(
  app: Koa,
  router: Router,
  implementation: T,
  textBodyParser = true,
): Koa {
  if (textBodyParser) {
    app.use(bodyParser({
      enableTypes: ['text'],
    }))
  }

  const handler = new Handler<T>(implementation)

  router.post(DEFAULT_PATH, async ({request, response}: Koa.Context) => {
    const result = await handler.handle(request.body as string)
    response.body = result
  })

  return app
}
