const bcrypt = require('bcrypt')

const myPassword = 'admin123'

async function verifyPass() {
  const hashPass = '$2b$10$2fgQ6LN1GUVFi65dswgdYeNPLSWLXo0ZLNM.G4FnXjng9l6ttTq06'
  const isMatch = await bcrypt.compare(myPassword, hashPass)

  console.log('👉🏻👉🏻', isMatch)
}

verifyPass()
