type ParamType<T> = T extends (a: infer A) => any ? A : 
                    T extends (a: infer A, b: infer B) => any ? [A, B] :
                    T extends (a: infer A, b: infer B, c: infer C) => any ? [A, B, C] :
                    T extends (a: infer A, b: infer B, c: infer C, d: infer D) => any ? [A, B, C, D] :
                    T extends (a: infer A, b: infer B, c: infer C, d: infer D, e: infer E) => any ? [A, B, C, D, E] : never


export function serialize<T>(x: T): void {
  JSON.stringify(x)
}

export function deserialize<T>(text: string) {
  const x = JSON.parse(text)
  if ((typeof x === T)) {

  }
}   

