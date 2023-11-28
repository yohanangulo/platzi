export function logErrors(err, req, res, next) {
  console.log('logErrors function 🤘🤘')

  console.error(err)
  next(err) // cuando se le envia el parametro a traves de next se considera un middle de tipo error
}

export function boomErrorHandler(err, req, res, next) {
  console.log('boomErrorHandler 🥵🥵')
  if (err.isBoom) {
    const { output } = err
    return res.status(output.statusCode).json(output.payload)
  }

  next(err)
}

export function errorHandler(err, req, res, next) {
  console.log('errorHandler function 🤘🤘')

  const { stack, message } = err

  res.status(500).json({ message, stack })
}
