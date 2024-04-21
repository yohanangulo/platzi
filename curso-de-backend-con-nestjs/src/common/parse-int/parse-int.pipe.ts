import { BadRequestException, Injectable, PipeTransform } from '@nestjs/common'

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string) {
    const val = parseInt(value, 10)
    console.log(isNaN(val))
    console.log(val)

    if (isNaN(val)) {
      throw new BadRequestException(`${value} is not an integer`)
    }

    return val
  }
}
