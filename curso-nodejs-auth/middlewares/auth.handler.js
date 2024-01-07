const boom = require('@hapi/boom')
const { config } = require('../config/config')

function checkApiKey(req, _, next) {
  const apiKey = req.headers['api']
  if (apiKey === config.apiKey) {
    next()
    return
  }

  next(boom.unauthorized())
}

module.exports = checkApiKey
