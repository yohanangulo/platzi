const config = {
  port: process.env.PORT || 3000,
  dbUrl: process.env.DB_URL || 'mongodb://127.0.0.1:27017/express_web_sockets',
  appUrl: `http://localhost:${process.env.PORT || 3000}`,
  env: process.env.NODE_ENV || 'local',
}

module.exports = config
