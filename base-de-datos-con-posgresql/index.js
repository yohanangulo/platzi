const express = require('express')
const cors = require('cors')
const routerApi = require('./routes')

const { logErrors, errorHandler, boomErrorHandler, ormErrorHandler } = require('./middlewares/error.handler')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())

const whitelist = ['https://base-de-datos-con-postgres.onrender.com/']
const options = {
  origin: (origin, callback) => {
    if (whitelist.includes(origin) || !origin) {
      callback(null, true)
    } else {
      callback(new Error(`no permitido ${origin}`))
    }
  },
}
app.use(cors(options))

app.get('/', (req, res) => {
  res.send('Hola mi server en express')
})

app.get('/nueva-ruta', (req, res) => {
  res.send('Hola, soy una nueva ruta')
})

routerApi(app)

app.use(logErrors)
app.use(boomErrorHandler)
app.use(ormErrorHandler)
app.use(errorHandler)

app.listen(port, () => {
  // eslint-disable-next-line no-console
  console.log('Listening on por', port, '🚀🚀🚀')
})
