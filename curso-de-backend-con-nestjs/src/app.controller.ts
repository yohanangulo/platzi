import { Controller, Get } from '@nestjs/common'

@Controller()
export class AppController {
  @Get()
  getHello(): string {
    return 'pilas!'
  }

  @Get('nuevo')
  newEndPoint() {
    return 'yo soy nuevo endpoint'
  }

  @Get('/ruta/') // lo resuelve no importa si en el cliente se usan o no /
  nuevo() {
    return 'hello'
  }
}
