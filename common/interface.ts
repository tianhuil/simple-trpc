export interface RPC {
  hello(name: string): Promise<string>
}
