export interface RPC {
  hello(name: string): Promise<string>
  add(x: number, y: number): Promise<number>
}
