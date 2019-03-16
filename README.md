# typescript-rpc
Dumb Simple Typescript RPC.

[![Build Status](https://travis-ci.com/tianhuil/typescript-rpc.svg?branch=master)](https://travis-ci.org/tianhuil/typescript-rpc)

Features:
- Zero codegen.
- Zero dependencies.
- Uses pure typescript.
- Support for [Express](https://expressjs.com/) and [Koa](https://koajs.com/).
- Typesafe RPC call in simple three simple steps:


## Step 1: Define the interface
```ts
// interface.ts

export interface IUser {
  id: number
  name: string
}

export interface IRPC {
  add(x: number, y: number): Promise<number>
  user(id: number): Promise<IUser>
}
```

## Step 1: Implement the interface as a class and register
```ts
// server.ts

export class RPCImpl implements IRPC {
  public add = async (x: number, y: number) => x + y
  public user = async (id: number) => ({
    id,
    name: 'Bob ' + id,
  })
}

registerHandler<IRPC>(app, new RPCImpl())
```

## Step 3: Connect the client and use it!
```ts
// client.ts

const client = Client<IRPC>(httpConnector('http://example.com'))

async function main() {
  console.log(await client.add(2, 3))
  console.log(await client.user(5))
}
```

For more details, see `example/` folder for Express- and Koa-specific server implementations.
