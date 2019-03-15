import bodyParser from 'body-parser'
import express from 'express'

import { RPC } from './interface'
import { RPCImpl } from './implementation'
import { Handler } from '../lib/handler'

const implementation = new RPCImpl()
const handler = new Handler<RPC>(implementation)

const app: express.Application = express()
app.use(bodyParser.text());
const port = 4000

app.get('/', (_, res) => res.send('Hello World!!'))
app.post('/rpc', async (req, res) => {
  const response = await handler.handle(req.body)
  res.set('Content-Type', 'text/plain')
  res.send(response)
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
