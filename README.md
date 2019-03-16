# typescript-rpc
## Dumb Simple Typescript RPC.
- Zero codegen.
- Zero dependencies.
- Uses pure typescript.
- Support for [Express](https://expressjs.com/) and [Koa](https://koajs.com/).
- Typesafe RPC call in simple three simple steps:


## Step 1: Eefine the interface
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

const app = express()
registerHandler<IRPC>(app, implementation)
app.listen(port)
```

## Step 3: get the client
```ts
// client.ts

const client = Client<IRPC>(httpConnector('http://example.com'))

async function main() {
  console.log(await client.add(2, 3))
  console.log(await client.user(5))
}
```

For more details, see `example/` folder.
