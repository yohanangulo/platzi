const express = require('express')
const bodyParser = require('body-parser')
const http = require('http')
const cors = require('cors')

const router = require('./src/network/routes')
const connectDB = require('./src/db/db')
const config = require('./config/config')
const socket = require('./src/socket')

const app = express()
const server = http.Server(app)
socket.connect(server)

app.use(cors())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
router(app)
app.use('/app', express.static('./public'))

//
;(async () => {
  await connectDB()
  server.listen(config.port, () => console.log('🚀 Server on', config.appUrl, config.env))
})()
