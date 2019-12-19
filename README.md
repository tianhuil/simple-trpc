# simple-trpc
Dumb Simple Typescript RPC!

[![Travis (.com)](https://img.shields.io/travis/com/tianhuil/simple-trpc.svg?style=for-the-badge)](https://travis-ci.org/tianhuil/simple-trpc)
[![npm (scoped)](https://img.shields.io/npm/v/@tianhuil/simple-trpc.svg?style=for-the-badge)](https://www.npmjs.com/package/@tianhuil/simple-trpc)
[![NPM](https://img.shields.io/npm/l/@tianhuil/simple-trpc.svg?style=for-the-badge)](https://www.npmjs.com/package/@tianhuil/simple-trpc)
[![GitHub package.json dependency version](https://img.shields.io/github/package-json/dependency-version/tianhuil/simple-trpc/dev/@babel/preset-typescript.svg?style=for-the-badge)](https://github.com/tianhuil/simple-trpc/blob/master/package.json)
[![GitHub package.json dependency version](https://img.shields.io/github/package-json/dependency-version/tianhuil/simple-trpc/dev/typescript.svg?style=for-the-badge)](https://github.com/tianhuil/simple-trpc/blob/master/package.json)
[![GitHub issues](https://img.shields.io/github/issues/tianhuil/simple-trpc.svg?style=for-the-badge)](https://github.com/tianhuil/simple-trpc/issues)

## Install
```bash
npm install @tianhuil/simple-trpc
```

## Features
- Zero codegen.
- Zero runtime dependencies (only dependencies are for typing, development, and testing).
- Uses pure typescript to ensure typesafety.
- Support for [Express](https://expressjs.com/) and [Koa](https://koajs.com/).
- Handles authorization tokens (e.g. JWT)

## Usage
Typesafe RPC call in three simple steps:

### Step 1: Define the typesafe interface
This is the interface 
```ts
// interface.ts
import { IRPC, RPCRet } from 'simple-trpc'

export interface IUser {
  id: number
  name: string
}

export interface IExampleRPC extends IRPC<IExampleRPC> {
  add(x: number, y: number): Promise<RPCRet<number>>
  user(id: number): Promise<RPCRet<IUser>>
}
```

The interface `IRPC` ensure typesafety.  All methods return promises of
```ts
type RPCRet<T> = { data: T } | { error: string }
```
which supports both errors and data


### Step 2: Implement the interface as a class and register
```ts
// server.ts

export class ExampleRPCImpl implements IExampleRPC {
  public add = async (x: number, y: number) => { data: x + y }
  public user = async (id: number) => ({
    data: {
      id,
      name: 'Bob ' + id,
    }
  })
}

registerExpressHandler<IExampleRPC>(expressApp, new RPCImpl())
// or registerKoaHandler<IExampleRPC>(koaApp, new RPCImpl())
```

### Step 3: Connect the client and use it!
```ts
// client.ts

const client = makeClient<IExampleRPC>(httpConnector('http://example.com'))

async function main() {
  console.log(await client.add(2, 3))
  const result = await client.user(5)
  if (result.error) {
    console.log(`Encountered error: ${result.error}`)
  } else {
    console.log(result.data)
  }
}
```

## Learn More
For more details, see `example/` folder to see a working example.

1. Open the `package.json` and run the corresponding scripts.
2. View the client and server code for Express- and Koa-specific examples

## How does it work?
The protocol uses json serialization between client and server.  All results are passed asynchronously through promisses.  Typesafety comes from typescript's type system.  On each call:

1. The client serializes the function name and arguements, sending them to the server.
2. The server deserializes this, runs the computation on it's implementation, serializes the result, and sends them (or an error) back to the client.
3. The client deserializes the result returned from the server as javascript objects.
