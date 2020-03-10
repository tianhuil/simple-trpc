import { Handler } from './handler/handler'
import { deserializeResult, serializeFunc } from './serialize'
import { IRpc } from './type'
import { DEFAULT_PATH } from './util'

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

export function directConnector<Impl extends IRpc<Impl>>(
  handler: Handler<Impl>,
): Connector {
  return handler.handle.bind(handler)
}

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
  auth?: string     // bearer auth token (if required)
  path?: string     // path for server
  timeout?: number  // timeout for client response
}

const defaultOptions = {
  auth: '',
  path: DEFAULT_PATH,
  durationMs: 10000,
}

// export for mocking in jest
export const rawFetch: typeof window.fetch = (typeof window === 'undefined') ? require('node-fetch') : window.fetch

type TimedFetch = (...arg: Parameters<typeof window.fetch>) => Promise<Response>

export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message); // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype); // restore prototype chain
  }
}

export function timedFetch(durationMs: number): TimedFetch {
  return function (input, init?) {
    return Promise.race([
      rawFetch(input, init),
      // NB: this doens't actually return a Response, but throws an error
      // Using Response is just to silence the type system
      new Promise<Response>((_, reject) => 
        setTimeout(() => reject(new TimeoutError(`timeout after ${durationMs} ms while waiting for ${input}`)), durationMs)
      )
    ])
  }
}

export function httpConnector(
  url: string,
  options?: IHttpConnectorOptions,
): Connector {
  const { path, auth, durationMs } = {...defaultOptions, ...options}

  const headers: { [key: string]: string } = { 'Content-Type': 'text/plain' }
  if (auth) {
    headers['Authorization'] = `Bearer ${auth}`
  }
  const fetch = timedFetch(durationMs)

  return async (input: string) => {
    const response = await fetch(joinPath(url, path), {
      body: input,
      headers,
      method: 'post',
    })
    return response.text()
  }
}
