export interface IUser {
  id: number
  name: string
}

export interface IRPC {
  hello(name: string): Promise<string>
  add(x: number, y: number): Promise<number>
  user(id: number): Promise<IUser>
}
