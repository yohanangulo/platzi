const { Client } = require('pg')

async function getConnDB() {
  const client = new Client({
    host: 'localhost',
    port: 5432,
    user: 'yohan',
    password: 'admin',
    database: 'my_store',
  })

  await client.connect()

  return client
}

module.exports = getConnDB
