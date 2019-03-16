import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { DEFAULT_PATH } from '../utils'
import { Handler } from './handler'

export function registerHandler<T extends object>(
  app: express.Application,
  implementation: T,
  textBodyParser: boolean = true,
  path: string = DEFAULT_PATH,
): express.Application {
  if (textBodyParser) {
    app.use(bodyParser.text())
  }

  const handler = new Handler<T>(implementation)

  app.post(path, async (req: Request, res: Response): Promise<void> => {
    const response = await handler.handle(req.body)
    res.set('Content-Type', 'text/plain')
    res.send(response)
  })

  return app
}
