/* tslint:disable:no-console */

import bodyParser from 'body-parser'
import express from 'express'

import { expressHandler } from '../src/handler/express'
import { RPCImpl } from './implementation'
import { IRPC } from './interface'

const implementation = new RPCImpl()

const app: express.Application = express()
app.use(bodyParser.text())
const port = 4000

app.get('/', (_, res) => res.send('Hello World!!'))
app.post('/rpc', expressHandler<IRPC>(implementation))

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
