import { Injectable, NotFoundException } from '@nestjs/common'
import { CreateProductDto } from './dtos/create-product.dto'
import { Product } from './entities/product.entity'
import { UpdateProductDto } from './dtos/update-product.dto'

@Injectable()
export class ProductsService {
  private counterId = 1

  private products: Product[] = [
    {
      id: 1,
      name: 'product 1',
      description: 'this is a description',
      price: 100,
      stock: 2,
      imageUrl: 'http://image.com/image.jpg',
    },
  ]

  findAll() {
    return this.products
  }

  findOne(id: number) {
    const product = this.products.find((item) => item.id == id)

    if (!product) {
      throw new NotFoundException('product not found')
    }

    return product
  }

  create(payload: CreateProductDto) {
    this.counterId++

    const newProduct = {
      id: this.counterId,
      ...payload,
    }

    this.products.push(newProduct)

    return newProduct
  }

  update(id: number, payload: UpdateProductDto) {
    const product = this.findOne(id)
    if (!product) {
      return null
    }

    const index = this.products.findIndex((item) => item.id == id)

    this.products[index] = {
      ...product,
      ...payload,
    }

    return this.products[index]
  }

  delete(id: number) {
    this.findOne(id)

    this.products = this.products.filter((product) => product.id != id)

    return true
  }
}
