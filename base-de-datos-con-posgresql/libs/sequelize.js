const { Sequelize } = require('sequelize')
const setUpModels = require('../db/models')
const config = require('../config/config')

const sequelize = new Sequelize(config.dbUri[config.env], { dialect: 'postgres' })

setUpModels(sequelize)
// sequelize.sync()

module.exports = sequelize
