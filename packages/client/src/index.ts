import { deserializeResult, serializeFunc, IRpc, DEFAULT_PATH } from '@tianhuil/simple-trpc-core'

export function makeClient<Impl extends IRpc<Impl>>(
  connector: Connector,
): Impl {
  return new Proxy({}, {
    get(_, name: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return async (...args: any[]) => {
        const input = serializeFunc({ name, args })
        const output = await connector(input)
        return deserializeResult(output).result
      }
    },
  }) as Impl
}

// connectors connect to server
export type Connector = (text: string) => Promise<string>

export function joinPath(x: string, y: string): string {
  // Don't want to include path module so do this manaully
  if (x.substr(-1) === '/' && y[0] === '/') {
    return x + y.substr(1)
  } else if (x.substr(-1) !== '/' && y[0] !== '/') {
    return x + '/' + y
  } else {
    return x + y
  }
}

export interface IHttpConnectorOptions {
  auth?: string
  path?: string
}

const defaultOptions = {
  auth: '',
  path: DEFAULT_PATH,
}

const fetch = (typeof window === 'undefined') ? require('node-fetch') : window.fetch

export function httpConnector(
  url: string,
  options?: IHttpConnectorOptions,
): Connector {
  const { path, auth } = {...defaultOptions, ...options}

  const headers: { [key: string]: string } = { 'Content-Type': 'text/plain' }
  if (auth) {
    headers['Authorization'] = `Bearer ${auth}`
  }

  return async (input: string) => {
    const response = await fetch(joinPath(url, path), {
      body: input,
      headers,
      method: 'post',
    })
    return response.text()
  }
}
