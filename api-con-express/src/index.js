import express, { json } from 'express'
import { routerApi, routerApiV2 } from './routes/index.js'
import { boomErrorHandler, errorHandler, logErrors } from './middlewares/error.handler.js'
import { corsConfig } from './config/cors.js'

const app = express()

const PORT = process.env.PORT || 3001

app.use(json())

app.use(corsConfig())

routerApi(app)
routerApiV2(app)

// middlewares van despues de las rutas
app.use(logErrors)
app.use(boomErrorHandler)
app.use(errorHandler)

app.listen(PORT, () => {
  console.log('Server running on port', PORT, '🚀🚀🚀')
})
