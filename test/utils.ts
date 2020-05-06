import { IExampleRPC } from '../example/interface'
import * as implLib from '../example/impl'
import { data, error } from '../src/util'

export const testClientHello = (client: IExampleRPC) => {
  test('test helllo world', async () => {
    expect(await client.hello('Bob')).toEqual(data('Hello World, Bob'))
  })
}

export const testClientAll = (client: IExampleRPC) => {
  test('test helllo world', async () => {
    expect(await client.hello('Bob')).toEqual(data('Hello World, Bob'))
  })

  test('test 1 + 2  = 3', async () => {
    expect(await client.add(1, 2)).toEqual(data(3))
  })

  test('test fetching user 5', async () => {
    expect(await client.user(5)).toEqual(data({id: 5, name: 'Bob 5'}))
  })

  test('test continuation', async () => {
    const sideEffect = jest.spyOn(implLib, 'sideEffect')
    expect(await client.continuation()).toEqual(data(1))
    expect(sideEffect).toHaveBeenCalledTimes(2)
  })

  test('test error', async () => {
    expect(await client.error()).toEqual(error('error'))
  })
}
