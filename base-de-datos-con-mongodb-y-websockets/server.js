const express = require('express')
const bodyParser = require('body-parser')

const router = express.Router()

const app = express()
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(router)

router.get('/', (req, res) => {
  res.header({
    'custom-header': 'hola!',
  })
  res.send('hola dende get')
})

router.post('/', (req, res) => {
  res.send('hola dende post')
})

// app.use('/', (req, res) => {
//   res.send('hola mundo')
// })

app.listen(3000, () => console.log(process.env.APP_URL))
