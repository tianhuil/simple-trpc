import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import { Handler } from '.'

export function registerHandler<T extends object>(
  app: express.Application,
  implementation: T,
  textBodyParser = true,
): express.Application {
  if (textBodyParser) {
    app.use(bodyParser.text())
  }

  const handler = new Handler<T>(implementation)

  app.post('/rpc', async (req: Request, res: Response): Promise<void> => {
    const response = await handler.handle(req.body)
    res.set('Content-Type', 'text/plain')
    res.send(response)
  })

  return app
}
