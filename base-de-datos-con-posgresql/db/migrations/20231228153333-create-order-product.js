'use strict'

const { ORDER_PRODUCT_TABLE, OrderProductSchema } = require('../models/order-product.model')
const { ORDER_TABLE } = require('../models/order.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_PRODUCT_TABLE, OrderProductSchema)
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE)
  },
}
