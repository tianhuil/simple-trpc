# simple-trpc
Dumb Simple Typescript RPC.

[![Build Status](https://travis-ci.com/tianhuil/simple-trpc.svg?branch=master)](https://travis-ci.org/tianhuil/simple-trpc)
![npm (scoped)](https://img.shields.io/npm/v/@tianhuil/simple-trpc.svg)
![NPM](https://img.shields.io/npm/l/@tianhuil/simple-trpc.svg)
![GitHub package.json dependency version](https://img.shields.io/github/package-json/dependency-version/tianhuil/simple-trpc/dev/@babel/preset-typescript.svg)
![GitHub package.json dependency version](https://img.shields.io/github/package-json/dependency-version/tianhuil/simple-trpc/dev/typescript.svg)
![GitHub issues](https://img.shields.io/github/issues/tianhuil/simple-trpc.svg)

## Install
```bash
npm install @tianhuil/simple-trpc
```

## Features
- Zero codegen.
- Zero dependencies.
- Uses pure typescript.
- Support for [Express](https://expressjs.com/) and [Koa](https://koajs.com/).

## Usage
Typesafe RPC call in simple three simple steps:

### Step 1: Define the interface
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

### Step 2: Implement the interface as a class and register
```ts
// server.ts

export class RPCImpl implements IRPC {
  public add = async (x: number, y: number) => x + y
  public user = async (id: number) => ({
    id,
    name: 'Bob ' + id,
  })
}

registerExpressHandler<IRPC>(app, new RPCImpl())
// or registerKoaHandler<IRPC>(app, new RPCImpl())
```

### Step 3: Connect the client and use it!
```ts
// client.ts

const client = makeClient<IRPC>(httpConnector('http://example.com'))

async function main() {
  console.log(await client.add(2, 3))
  console.log(await client.user(5))
}
```

## Learn More
For more details, see `example/` folder to see a working example.

1. Open the `package.json` and run the corresponding scripts.
2. View the client and server code for Express- and Koa-specific examples
