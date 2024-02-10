module.exports = {
  env: process.env.NODE_ENV || 'local',
  dbUrl: process.env.DB_URL || 'mongodb://127.0.0.1:27017/express_web_sockets',
  appUrl: process.env.APP_URL || 'http://localhost:3000',
}
