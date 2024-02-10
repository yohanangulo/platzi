const express = require('express')
const bodyParser = require('body-parser')
const router = require('./src/network/routes')
const connectDB = require('./src/db/db')
const config = require('./config/config')

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
router(app)
app.use('/app', express.static('./public'))

//
;(async () => {
  await connectDB()
  app.listen(3000, () => console.log('🚀 Server on', config.appUrl, config.env))
})()
