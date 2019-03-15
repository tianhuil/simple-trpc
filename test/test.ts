/* tslint:disable:no-console */

import { RPCImpl } from '../example/implementation'
import { IRPC } from '../example/interface'
import { Client, directConnector } from '../src/client'
import { Handler } from '../src/handler'

const implementation = new RPCImpl()
const handler = new Handler<IRPC>(implementation)
const client = Client<IRPC>(directConnector(handler))

test('test helllo world', async () => {
  expect(await client.hello('Bob')).toBe('Hello World, Bob')
})

test('test 1 + 2  = 3', async () => {
  expect(await client.add(1, 2)).toBe(3)
})

test('test fetching user 5', async () => {
  expect(await client.user(5)).toEqual({id: 5, name: 'Bob 5'})
})
