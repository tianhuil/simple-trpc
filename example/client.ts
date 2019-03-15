import { RPC } from './interface'
import { httpConnector, Client } from '../lib/client'

const port = 4000
const url = `http://localhost:${port}/rpc`
const client = Client<RPC>(httpConnector(url))
async function main() {
  console.log(await client.hello("Bob"))
  console.log(await client.add(2, 3))  
}

main()
