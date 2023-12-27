const { Sequelize } = require('sequelize')
const { URI } = require('./prostgre.pool')
const setUpModels = require('../db/models')

const sequelize = new Sequelize(URI, { dialect: 'postgres' })

setUpModels(sequelize)
// sequelize.sync()

module.exports = sequelize
