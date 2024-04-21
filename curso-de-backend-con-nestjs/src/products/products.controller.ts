import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Delete,
  HttpStatus,
  HttpCode,
  ValidationPipe,
  // ParseIntPipe,
} from '@nestjs/common'
import { ProductsService } from './products.service'
import { ParseIntPipe } from 'src/common/parse-int/parse-int.pipe'
import { CreateProductDto } from './dtos/create-product.dto'
import { UpdateProductDto } from './dtos/update-product.dto'

@Controller('products')
export class ProductsController {
  constructor(private productService: ProductsService) {}

  @Get()
  list() {
    // @Query('offset') offset: number = 0, // @Query('limit') limit: number = 100,
    // return `limit =>${limit}, <br> offset =>${offset}`
    return this.productService.findAll()
  }

  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  findOne(@Param('id', ParseIntPipe) id: string) {
    // return {
    //   message: `product ${id}`,
    // }
    return this.productService.findOne(+id)
  }

  @Post()
  create(@Body() payload: CreateProductDto) {
    // return {
    //   message: 'create action',
    //   payload,
    // }
    return this.productService.create(payload)
  }

  @Put(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateProductDto,
  ) {
    // return {
    //   message: `updating ${productId}`,
    //   body: payload,
    // }
    return this.productService.update(id, payload)
  }

  @Delete(':id')
  delete(@Param('id', ParseIntPipe) id: number) {
    // return {
    //   message: `deleting ${productId}`,
    // }

    return this.productService.delete(id)
  }
}
