import {
  IsString,
  IsNumber,
  IsUrl,
  IsNotEmpty,
  IsPositive,
} from 'class-validator'

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  readonly name: string

  @IsString()
  @IsNotEmpty()
  readonly description: string

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly price: number

  @IsNumber()
  @IsPositive()
  @IsNotEmpty()
  readonly stock: number

  @IsUrl()
  @IsNotEmpty()
  readonly imageUrl: string
}
