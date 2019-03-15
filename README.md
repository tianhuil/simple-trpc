# typescript-rpc
Dumb Simple Typescript RPC.
- Zero codegen.
- Uses pure typescript
- Typesafe RPC call in simple three simple steps:

## Step 1: define the interface
```ts
// interface.ts

export interface IRPC {
  hello(name: string): Promise<string>
  add(x: number, y: number): Promise<number>
}
```

## Step 1: implement the interface as a class and attach to express
```ts
// server.ts
import { IRPC } from './interface'
import { Handler } from 'typescript-rpc/handler'

export class RPCImpl implements IRPC {
  public async hello(name: string): Promise<string> {
    return `Hello World, ${name}`
  }
  public async add(x: number, y: number): Promise<number> {
    return x + y
  }
}

const handler = new Handler<IRPC>(new RPCImpl())

// create express app with `bodyParser.text()`

app.post('/rpc', async (req, res) => {
  const response = await handler.handle(req.body)
  res.set('Content-Type', 'text/plain')
  res.send(response)
})

```

## Step 3: get the client
```ts
// client.ts

import { Client, httpConnector } from 'typescript-rpc/client'
import { IRPC } from './interface'

const client = Client<IRPC>(httpConnector('http://localhost ...'))
async function main() {
  console.log(await client.hello('Bob'))
  console.log(await client.add(2, 3))
}
```

For more details, see `example/`.
