import { Request, Response } from 'express'
import { Handler } from '.'

export function expressHandler<T extends object>(implementation: T) {
  const handler = new Handler<T>(implementation)
  return async (req: Request, res: Response): Promise<void> => {
    const response = await handler.handle(req.body)
    res.set('Content-Type', 'text/plain')
    res.send(response)
  }
}
