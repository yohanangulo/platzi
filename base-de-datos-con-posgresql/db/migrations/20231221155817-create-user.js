'use strict'
const { DataTypes } = require('sequelize')
const { USER_TABLE } = require('../models/user.model')

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.createTable(USER_TABLE, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },

      email: {
        allowNull: false,
        type: DataTypes.STRING,
        unique: true,
      },

      password: {
        allowNull: false,
        type: DataTypes.STRING,
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
    await queryInterface.dropTable(USER_TABLE)
  },
}
