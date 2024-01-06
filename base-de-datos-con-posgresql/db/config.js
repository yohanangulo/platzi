const config = require('./../config/config')

const URI = config.dbUri[config.env]

console.log('👉🏻', URI)

module.exports = {
  development: {
    url: URI,
    dialect: 'postgres',
  },
  production: {
    url: URI,
    dialect: 'postgres',
  },
}
