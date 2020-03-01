import bodyParser from 'body-parser'
import { Application, Request, Response } from 'express'
import { IRpc } from '../type'
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
  impl: Impl,
  options: IExpressHandlerOptions = {},
): Application {
  const {path, textBodyParser} = {...defaultOptions, ...options}

  if (textBodyParser) {
    app.use(bodyParser.text())
  }

  const handler = new Handler<Impl>(impl)

  app.post(path, async (req: Request, res: Response): Promise<void> => {
    res.set('Content-Type', 'text/plain')
    res.send(await handler.handle(req.body))
  })

  return app
}
