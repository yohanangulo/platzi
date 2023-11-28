import express, { json } from 'express'
import { routerApi, routerApiV2 } from './routes/index.js'
import { boomErrorHandler, errorHandler, logErrors } from './middlewares/error.handler.js'

const app = express()
app.use(json())

routerApi(app)
routerApiV2(app)

// middlewares van despues de las rutas
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

const PORT = process.env.PORT || 3001

app.listen(PORT, () => {
  console.log('Server running on port', PORT, '🚀🚀🚀')
})
