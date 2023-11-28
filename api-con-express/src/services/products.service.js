import { faker } from '@faker-js/faker'
import boom from '@hapi/boom'

class ProductsService {
  constructor() {
    this.products = []
    this.generate()
  }

  generate() {
    for (let i = 0; i < 15; i++) {
      this.products.push({
        id: faker.string.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.url(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newProduct = {
      id: faker.string.uuid(),
      ...data,
    }

    this.products.push(newProduct)

    return newProduct
  }

  /**
   *
   * @returns list of products
   */
  find() {
    return new Promise(resolve => {
      setTimeout(() => {
        resolve(this.products)
      }, 1000)
    })
  }

  /**
   *
   * @param {string} id
   * @returns single products
   */
  async findOne(id) {
    const product = this.products.find(product => product.id === id)

    if (!product) {
      throw boom.notFound('Product not found')
    }

    if (product.isBlock) {
      throw boom.conflict('Product blocked')
    }

    return product
  }

  /**
   *
   * @param {string} id update item
   */
  async update(id, data) {
    const index = this.products.findIndex(product => product.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    this.products[index] = { ...this.products[index], ...data }

    return this.products[index]
  }

  async delete(id) {
    const index = this.products.findIndex(product => product.id === id)

    if (index === -1) {
      throw boom.notFound('Product not found')
    }

    this.products.splice(index, 1)

    return { message: 'product deleted sucessfully' }
  }
}

export default ProductsService
