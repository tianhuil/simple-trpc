/* tslint:disable:no-console */

import { httpConnector, makeClient } from '../src/client'
import { IRPC } from './interface'

const port = process.env.PORT || 4000
const url = `http://localhost:${port}/`
const client = makeClient<IRPC>(httpConnector(url))
async function main() {
  console.log(await client.hello('Bob'))
  console.log(await client.add(2, 3))
  console.log(await client.user(5))
}

main()
