import { joinPath } from '../src/client'
import { deserializeFunc, deserializeResult, serializeFunc, serializeResult } from '../src/utils';

test('Test joinPath', () => {
  expect(joinPath('http://example.com', 'path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com/', 'path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com', '/path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com/', '/path')).toBe('http://example.com/path')
})

test('Test serialization', () => {
  describe.each([
    {name: 'foo', args: [2, 'foo']},
    {name: 'bar', args: [{a: 2, b: 'foo'}, {c: 4, d: 'zoo'}]},
    {name: 'zif', args: [{a: 2, b: 'foo'}, {c: 4, d: {e: 3}}]},
  ])('test', (x) => expect(deserializeFunc(serializeFunc(x))).toEqual(x))

  describe.each([
    {name: 'foo', result: 'foo'},
    {name: 'foo', result: 3},
    {name: 'bar', result: {a: 2, b: 'foo'}},
    {name: 'zif', result: {c: 4, d: {e: 3}}},
  ])('test', (x) => expect(deserializeResult(serializeResult<any>(x))).toEqual(x))
})
