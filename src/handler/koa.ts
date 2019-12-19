import Koa from 'koa'
import bodyParser from 'koa-bodyparser'
import Router from 'koa-router'

import { IRPC } from '../type'
import { DEFAULT_PATH } from '../utils'
import { Handler } from './handler'

export interface IKoaHandlerOptions {
  path?: string
  textBodyParser?: boolean
  verifyCredentials?: (req: Koa.Request) => Promise<string | null>
}

const defaultOptions = {
  path: DEFAULT_PATH,
  textBodyParser: true,
  verifyCredentials: null,
}

export function registerKoaHandler<Impl extends IRPC<Impl>>(
  app: Koa,
  implementation: Impl,
  options: IKoaHandlerOptions = {},
): Koa {
  const {path, textBodyParser, verifyCredentials} = {...defaultOptions, ...options}

  if (textBodyParser) {
    app.use(bodyParser({
      enableTypes: ['text'],
    }))
  }

  const handler = new Handler<Impl>(implementation)

  const router = new Router()

  const handle = async (request: Koa.Request): Promise<string> => {
    if (verifyCredentials) {
      const invalid = await verifyCredentials(request)
      if (invalid) {
        return Handler.serializeError(request.body, {error: invalid})
      }
    }
    return handler.handle(request.body as string)
  }

  router.post(path, async ({request, response}: Koa.Context) => {
    response.body = await handle(request)
  })
  app.use(router.routes())

  return app
}
