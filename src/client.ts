import { Handler } from './handler/handler'
import { deserializeResult, serializeFunc } from './serialize'
import { IRpc } from './type'
import { DEFAULT_PATH } from './util'

export function makeClient<Impl extends IRpc>(
  connector: Connector,
): Impl {
  class CallStack {
    private names: string[]
    constructor(names: string[]) {
      this.names = names
    }
    public get(_: any, name: string): any {
      return new Proxy(function () {}, new CallStack([...this.names, name]))
    }
    public async apply(_: any, __: any, args: any[]) {
      const input = serializeFunc({ names: this.names, args })
      const output = await connector(input)
      return deserializeResult(output).result
    }
  }

  return new Proxy(function () {}, new CallStack([])) as Impl
}

// connectors connect to server
export type Connector = (text: string) => Promise<string>

export function directConnector<Impl extends IRpc>(
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
  auth?: string
  path?: string
}

const defaultOptions = {
  auth: '',
  path: DEFAULT_PATH,
}

// tslint:disable:no-var-requires
const fetch = (typeof window === 'undefined') ? require('node-fetch') : window.fetch

export function httpConnector(
  url: string,
  options?: IHttpConnectorOptions,
): Connector {
  const { path, auth } = {...defaultOptions, ...options}

  const headers: { [key: string]: string; } = { 'Content-Type': 'text/plain' }
  if (auth) {
    // tslint:disable:no-string-literal
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
