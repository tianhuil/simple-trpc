import { joinPath } from '../src/client'
import { deserializeFunc, deserializeResult, serializeFunc, serializeResult } from '../src/serialize'

test('Test joinPath', () => {
  expect(joinPath('http://example.com', 'path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com/', 'path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com', '/path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com/', '/path')).toBe('http://example.com/path')
})

test('Test Function Serialization', () => {
  describe.each([
    {names: ['foo'], args: [2, 'foo']},
    {names: ['bar'], args: [{a: 2, b: 'foo'}, {c: 4, d: 'zoo'}]},
    {names: ['zif'], args: [{a: 2, b: 'foo'}, {c: 4, d: {e: 3}}]},
  ])('test', (x) => expect(deserializeFunc(serializeFunc(x))).toEqual(x))
})

test('Test Result Serialization', () => {
  describe.each([
    {result: 'foo'},
    {result: 3},
    {result: {a: 2, b: 'foo'}},
    {result: {c: 4, d: {e: 3}}},
  ])('test', (x) => expect(deserializeResult(serializeResult<any>(x))).toEqual(x))
})
