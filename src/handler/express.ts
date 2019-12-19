import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { DEFAULT_PATH } from '../utils'
import { Handler } from './handler'
import { IRPC } from '../type'

export interface IExpressHandlerOptions {
  path?: string
  textBodyParser?: boolean
  verifyCredentials?: (req: Request) => Promise<string | null>
}

const defaultOptions = {
  path: DEFAULT_PATH,
  textBodyParser: true,
  verifyCredentials: null
}

export function registerExpressHandler<Impl extends IRPC<Impl>>(
  app: express.Application,
  impl: Impl,
  options: IExpressHandlerOptions = {},
): express.Application {
  const {path, textBodyParser, verifyCredentials} = {...defaultOptions, ...options}

  if (textBodyParser) {
    app.use(bodyParser.text())
  }

  const handler = new Handler<Impl>(impl)

  const handle = async (req: Request): Promise<string> => {
    if (verifyCredentials) {
      const invalid = await verifyCredentials(req)
      if (invalid) {
        return Handler.serializeError(req.body, {error: invalid})
      }
    }
    return handler.handle(req.body)
  }

  app.post(path, async (req: Request, res: Response): Promise<void> => {    
    res.set('Content-Type', 'text/plain')
    res.send(await handle(req))
  })
  
  return app
}
