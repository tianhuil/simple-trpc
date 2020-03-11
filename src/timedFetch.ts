// node-fetch's fetch and window.fetch are slightly incompatible
// forcing type Fetch to be defined as node-fetch since it is passed in for testing
import { Response, RequestInfo, RequestInit } from 'node-fetch'

export type Fetch = (url: RequestInfo, init?: RequestInit) => Promise<Response>

export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message) // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
  }
}
export function timedFetch(timeout: number, fetch?: Fetch): Fetch {
  return function (input: RequestInfo, init?) {
    // 
    const rawFetch = (fetch || window.fetch) as Fetch

    return Promise.race([
      rawFetch(input, init),
      // NB: this doens't actually return a Response, but throws an error
      // Using Response is just to silence the type system
      new Promise<Response>((_, reject) => setTimeout(
        () => reject(
          new TimeoutError(`timeout after ${timeout} ms while waiting for ${input}`)),
          timeout
        )
      )
    ])
  }
}
