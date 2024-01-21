const jwt = require('jsonwebtoken')

const secret = 'myCat'

const token =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOjEsInJvbGUiOiJjdXN0b21lciIsImlhdCI6MTcwNDY3OTk0OX0.UbT98Y2QPwSa-kDc7-Zzp0AZaNZ0htw3sd8gNjCLOXQ'

function verifyToken(token, secret) {
  return jwt.verify(token, secret)
}

const payload = verifyToken(token, secret)

console.log(payload)
