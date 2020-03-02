import { deserializeFunc, deserializeResult, serializeFunc, serializeResult } from './serialize'

test('Test serialization', () => {
  describe.each([
    {name: 'foo', args: [2, 'foo']},
    {name: 'bar', args: [{a: 2, b: 'foo'}, {c: 4, d: 'zoo'}]},
    {name: 'zif', args: [{a: 2, b: 'foo'}, {c: 4, d: {e: 3}}]},
  ])('test', (x) => expect(deserializeFunc(serializeFunc(x))).toEqual(x))

  describe.each([
    {result: 'foo'},
    {result: 3},
    {result: {a: 2, b: 'foo'}},
    {result: {c: 4, d: {e: 3}}},
  ])('test',
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (x) => expect(deserializeResult(serializeResult<any>(x))
  ).toEqual(x))
})
