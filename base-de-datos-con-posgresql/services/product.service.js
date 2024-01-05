const { faker } = require('@faker-js/faker')
const boom = require('@hapi/boom')
const { models } = require('../libs/sequelize')
const { Op } = require('sequelize')

class ProductsService {
  generate() {
    const limit = 100
    for (let index = 0; index < limit; index++) {
      this.products.push({
        id: faker.datatype.uuid(),
        name: faker.commerce.productName(),
        price: parseInt(faker.commerce.price(), 10),
        image: faker.image.imageUrl(),
        isBlock: faker.datatype.boolean(),
      })
    }
  }

  async create(data) {
    const newProduct = await models.Product.create(data)

    return newProduct
  }

  async find({ limit, offset, price, price_min, price_max }) {
    const options = {
      include: ['category'],
      where: {},
    }

    if (limit && offset) {
      options.limit = limit
      options.offset = offset
    }

    if (price) {
      options.where.price = price
    }

    if (price_min && price_max) {
      options.where.price = {
        [Op.gte]: price_min,
        [Op.lte]: price_max,
      }
    }

    const products = await models.Product.findAll(options)

    return products
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id)

    if (!product) {
      throw boom.notFound('product not found')
    }

    return product
  }

  async update(id, changes) {
    const product = await this.findOne(id)

    const updatedProduct = await product.update(changes)

    return updatedProduct
  }

  async delete(id) {
    const product = await this.findOne(id)

    product.destroy()

    return { id }
  }
}

module.exports = ProductsService
