import { deserializeFunc, serializeResult } from "./utils"

export class Server<T extends object> {
  implementation: T;
  constructor(implementation: T)
  {
    this.implementation = implementation;
  }
  handle(text: string)
  {
    const { name, args } = deserializeFunc(text);
    const value = (this.implementation as any)[name](...args);
    return serializeResult<T>({ name, value });
  }
}
