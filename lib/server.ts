import { deserializeFunc, serializeResult } from "./utils"

export class Server<T extends object> {
  implementation: T;
  constructor(implementation: T) {
    this.implementation = implementation;
  }
  async handle(text: string) {
    const { name, args } = deserializeFunc(text);
    const result = await (this.implementation as any)[name](...args);
    return serializeResult<T>({ name, result });
  }
}
