const bcrypt = require('bcrypt')

const myPassword = 'admin123'

async function hashPass() {
  const hash = await bcrypt.hash(myPassword, 10)
  console.log(hash)
}

hashPass()
