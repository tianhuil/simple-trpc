// export for mocking in jest
export const rawFetch: typeof window.fetch = (
  typeof window === 'undefined'
) ? (
  require('node-fetch')
) : (
  window.fetch
)

type TimedFetch = (...arg: Parameters<typeof window.fetch>) => Promise<Response>

export class TimeoutError extends Error {
  constructor(message?: string) {
    super(message) // 'Error' breaks prototype chain here
    Object.setPrototypeOf(this, new.target.prototype) // restore prototype chain
  }
}
export function timedFetch(timeout: number): TimedFetch {
  return function (input, init?) {
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
