/* tslint:disable:no-console */

import express from 'express'

import { registerExpressHandler } from '@tianhuil/simple-trpc'
import { ExampleRPCImpl } from './implementation'
import { IExampleRPC } from './interface'

const implementation = new ExampleRPCImpl()

const app: express.Application = express()
const port = 4000

app.get('/', (_, res) => res.send('Hello World!!'))
registerExpressHandler<IExampleRPC>(app, implementation)

app.listen(port, () => console.log(`Express app listening on port ${port}!`))
