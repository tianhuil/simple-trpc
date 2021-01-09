import { RequestInit } from 'node-fetch'
import { Handler } from './handler/handler'
import { deserializeResult, serializeFunc } from './serialize'
import { IError, IRpc } from './type'
import { DEFAULT_PATH } from './util'
import { timedFetch, Fetch } from './timedFetch'

/**
   * Allow users to handle errors more gracefully by letting them return
   * an IError instead of throwing them.
   *
   * @param name Name of the method that didn't completed.
   * @param error The error, can be of any type (usually is a JSON detailing)
   * the incident.
   */
type HandleErrorCB <Impl extends IRpc<Impl>> = (name: keyof Impl, error: unknown) => IError | Promise<IError>

/**
 * @param handleError If present it return a generic IError in case it's
 * a boolean. Otherwise if a callback is provided it allow users to handle
 * client-side errors as needed instead of throwing them.
 */
export function makeClient<Impl extends IRpc<Impl>>(
  connector: Connector,
  handleError: boolean | HandleErrorCB<Impl> = false
): Impl {
  return new Proxy({}, {
    get(_, name: string) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return async (...args: any[]) => {
        const input = serializeFunc({ name, args })
        try {
          const output = await connector(input)
          return deserializeResult(output).result
        } catch(error) {
          if (handleError) {
            if (typeof handleError === 'boolean') {
              console.error(error)
              return {
                type: 'error',
                message: 'Could not complete the request.'
              }
            }

            return await handleError(name as keyof Impl, error)
          } else {
            throw(error)
          }
        }
      }
    },
  }) as Impl
}

// connectors connect to server
export type Connector = (text: string) => Promise<string>

export function directConnector<Impl extends IRpc<Impl>, A>(
  handler: Handler<Impl, A>,
  augmenter: A,
): Connector {
  return async (text: string) => {
    const { continuation, result } = await handler.handle(text, augmenter)
    if (continuation) await continuation()
    return result
  }
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

// Cannot override body or method
type SlimRequestInit = Omit<Omit<RequestInit, 'body'>, 'method'>

export interface IHttpConnectorOptions {
  auth?: string                  // bearer auth token (if required)
  path?: string                  // path for server
  timeout?: number               // timeout for client response
  requestInit?: SlimRequestInit  // options to pass to fetch.
  fetch?: Fetch                  // optional fetch to use
}

const defaultOptions = {
  auth: '',
  path: DEFAULT_PATH,
  timeout: 10000,
}

export function httpConnector(
  url: string,
  options?: IHttpConnectorOptions,
): Connector {
  const { path, auth, timeout, requestInit, fetch }: IHttpConnectorOptions = {...defaultOptions, ...options}

  const headers: { [key: string]: string } = { 'Content-Type': 'text/plain' }
  if (auth) {
    headers['Authorization'] = `Bearer ${auth}`
  }
  const _fetch = timedFetch(timeout, fetch)

  return async (input: string) => {
    const response = await _fetch(joinPath(url, path), {
      ...requestInit,
      body: input,
      headers,
      method: 'post',
    })
    return response.text()
  }
}
