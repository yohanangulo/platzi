const db = require('mongoose')
const config = require('../../config/config')

db.Promise = global.Promise
module.exports = async () => {
  await db.connect(config.dbUrl)
  console.log('🎉 [db conectada con exito]')
}
