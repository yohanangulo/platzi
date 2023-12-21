const { ValidationError } = require('sequelize')

function logErrors(err, req, res, next) {
  // eslint-disable-next-line no-console
  console.error(err)
  next(err)
}

function boomErrorHandler(err, req, res, next) {
  if (err.isBoom) {
    const { output } = err
    res.status(output.statusCode).json(output.payload)
  } else {
    next(err)
  }
}

function ormErrorHandler(err, _, res, next) {
  if (err instanceof ValidationError) {
    res.status(409).json({
      statusCode: 409,
      message: err.message,
      errors: err.errors,
    })
  }
  next(err)
}

// eslint-disable-next-line no-unused-vars
function errorHandler(err, _req, res, next) {
  res.status(500).json({
    message: err.message,
    stack: err.stack,
  })
}

module.exports = { logErrors, errorHandler, boomErrorHandler, ormErrorHandler }
