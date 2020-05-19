import express from 'express'

import { registerExpressHandler } from '@tianhuil/simple-trpc'
import { ExampleRPCImpl } from './impl'

const impl = new ExampleRPCImpl<express.Request>()

const app: express.Application = express()
const port = 4000

app.get('/', (_, res) => res.send('Hello World!!'))
registerExpressHandler(app, impl)

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
