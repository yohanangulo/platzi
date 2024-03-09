import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
  Query,
  Delete,
  HttpStatus,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common'
import { ProductsService } from './products.service'

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
  findOne(@Param('id') id: string) {
    // return {
    //   message: `product ${id}`,
    // }
    return this.productService.findOne(+id)
  }

  @Post()
  create(@Body() payload: any) {
    // return {
    //   message: 'create action',
    //   payload,
    // }
    return this.productService.create(payload)
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() payload: any) {
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
