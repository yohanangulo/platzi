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

function checkAdminRole(req, _, next) {
  const user = req.user

  if (user.role !== 'admin') {
    next(boom.unauthorized())
    return
  }

  next()
}

function checkRoles(...roles) {
  roles = roles[0]
  return (req, res, next) => {
    const user = req.user

    if (!roles.includes(user.role)) {
      next(boom.unauthorized())
      return
    }

    next()
  }
}

module.exports = { checkApiKey, checkAdminRole, checkRoles }
