/* tslint:disable:no-console */

import { Client, httpConnector } from '../src/client'
import { IRPC } from './interface'

const port = 4000
const url = `http://localhost:${port}/rpc`
const client = Client<IRPC>(httpConnector(url))
async function main() {
  console.log(await client.hello('Bob'))
  console.log(await client.add(2, 3))
  console.log(await client.user(5))
}

main()
