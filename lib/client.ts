import fetch from 'node-fetch'
import { Server } from "./server"
import { serializeFunc, deserializeResult } from "./utils"

export function Client<T extends object>(connector: Connector): T {
  return new Proxy({}, {
    get(a, name: string) {
      return async function (...args: any[]) {
        const input = serializeFunc({ name, args })
        const output = await connector(input)
        return deserializeResult(output).result
      }
    },
  }) as T
}

type Connector = (text: string) => Promise<string>

export function directConnector<T extends object>(server: Server<T>): Connector {
  return server.handle.bind(server)
}

export function httpConnector(url: string): Connector {
  return async (input: string) => {
    const response = await fetch(url, {
      headers: { 'Content-Type': 'text/plain' },
      body: input,
      method: "post",
    })
    return response.text()
  }
}
