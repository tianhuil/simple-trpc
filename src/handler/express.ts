import bodyParser from 'body-parser'
import { Application, Request, Response } from 'express'
import { ImplRpc, IRpc } from '../type'
import { DEFAULT_PATH } from '../util'
import { Handler } from './handler'

export interface IExpressHandlerOptions {
  path?: string
  textBodyParser?: boolean
}

const defaultOptions = {
  path: DEFAULT_PATH,
  textBodyParser: true,
}

export function registerExpressHandler<Impl extends IRpc<Impl>>(
  app: Application,
  impl: ImplRpc<Impl, Request>,
  options: IExpressHandlerOptions = {},
): Application {
  const {path, textBodyParser} = {...defaultOptions, ...options}

  if (textBodyParser) {
    app.use(bodyParser.text())
  }

  const handler = new Handler<Impl, Request>(impl)

  app.post(path, async (req: Request, res: Response): Promise<void> => {
    res.set('Content-Type', 'text/plain')
    const { continuation, result } = await handler.handle(req.body, req)
    res.status(200)
      .send(result)
      .end()
    if (continuation) await continuation()
  })

  return app
}
