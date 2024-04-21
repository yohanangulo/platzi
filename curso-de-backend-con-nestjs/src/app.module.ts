import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { ProductsController } from './products/products.controller'
import { CategoriesController } from './categories/categories.controller'
import { OrdersController } from './orders/orders.controller'
import { UserController } from './user/user.controller'
import { CustomersController } from './customers/customers.controller'
import { BrandsController } from './brands/brands.controller'
import { ProductsService } from './products/products.service';
import { OrdersService } from './orders/orders.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    OrdersController,
    UserController,
    CustomersController,
    BrandsController,
  ],
  providers: [ProductsService, OrdersService],
})
export class AppModule {}
