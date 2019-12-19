import { IExampleRPC } from '../example/interface'

export const testClientHello = (client: IExampleRPC) => {
  test('test helllo world', async () => {
    expect(await client.hello('Bob')).toEqual({data: 'Hello World, Bob'})
  })
}

export const testClientAll = (client: IExampleRPC) => {
  test('test helllo world', async () => {
    expect(await client.hello('Bob')).toEqual({data: 'Hello World, Bob'})
  })

  test('test 1 + 2  = 3', async () => {
    expect(await client.add(1, 2)).toEqual({data: 3})
  })

  test('test fetching user 5', async () => {
    expect(await client.user(5)).toEqual({data: {id: 5, name: 'Bob 5'}})
  })
}
