export const myName: string = 'yohan'

export const suma = (a: number, b: number) => a + b

export class Persona {
  constructor(
    private name: string,
    private age: number,
  ) {}

  async getSummary(): Promise<string> {
    return `My name is ${this.name} and I'm ${this.age}`
  }
}

interface IPersona {
  nombre: string
  hablar(): string
  caminar(): void
}

export class Estudiante implements IPersona {
  constructor(public nombre: string) {}

  hablar(): string {
    throw new Error('Method not implemented.')
  }
  caminar(): void {
    throw new Error('Method not implemented.')
  }
}

const es = new Estudiante('Yohan')

export function algo(obj: IPersona) {
  return obj
}

algo(es)

console.log(es.nombre)

export const persona = new Persona('yohan', 25)
