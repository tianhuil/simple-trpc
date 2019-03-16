import { IRPC } from '../example/interface'
import { Client } from '../src/client'

export function testClient(description: string, client: IRPC) {
  return describe(description, () => {
    test('test helllo world', async () => {
      expect(await client.hello('Bob')).toBe('Hello World, Bob')
    })

    test('test 1 + 2  = 3', async () => {
      expect(await client.add(1, 2)).toBe(3)
    })

    test('test fetching user 5', async () => {
      expect(await client.user(5)).toEqual({id: 5, name: 'Bob 5'})
    })
  })
}
