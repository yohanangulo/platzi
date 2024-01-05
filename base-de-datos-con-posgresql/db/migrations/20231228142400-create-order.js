'use strict'

const { DataTypes } = require('sequelize')
const { ORDER_TABLE } = require('../models/order.model')
const { CUSTOMER_TABLE } = require('../models/customer.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(ORDER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      customerId: {
        field: 'customer_id',
        type: DataTypes.INTEGER,
        references: {
          model: CUSTOMER_TABLE,
          key: 'id',
        },

        onUpdate: 'CASCADE',
        onDelete: 'SET NULL',
      },

      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: DataTypes.NOW,
      },
    })
  },

  async down(queryInterface) {
    await queryInterface.dropTable(ORDER_TABLE)
  },
}
