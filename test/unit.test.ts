import { joinPath } from '../src/client'

test('Test joinPath', () => {
  expect(joinPath('http://example.com', 'path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com/', 'path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com', '/path')).toBe('http://example.com/path')
  expect(joinPath('http://example.com/', '/path')).toBe('http://example.com/path')
})
