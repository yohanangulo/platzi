import { Controller, Get, Param } from '@nestjs/common'

@Controller('categories')
export class CategoriesController {
  @Get(':categoryId/products/:productId')
  getCategories(
    @Param('categoryId') categoryId: string,
    @Param('productId') productId: string,
  ) {
    return `product ${categoryId} and ${productId}`
  }
}
