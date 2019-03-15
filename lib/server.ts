import { deserializeFunc, serializeResult, FuncCall } from "./utils"

function parseInput(arg: string | object): FuncCall {
  switch(typeof arg) {
    case "string": {
      return deserializeFunc(arg)
    }
    case "object": {
      return arg as FuncCall
    }
  }
}

export class Server<T extends object> {
  implementation: T;
  constructor(implementation: T) {
    this.implementation = implementation;
  }
  async handle(arg: string | object) {
    const { name, args } = parseInput(arg)
    const result = await (this.implementation as any)[name](...args);
    return serializeResult<T>({ name, result });
  }
}
