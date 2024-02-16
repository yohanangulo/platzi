class Config {
  constructor({ appUrl, dbUrl }) {
    this.env = process.env.NODE_ENV || 'local'
    this.appUrl = appUrl
    this.dbUrl = dbUrl
  }
}

const config = {
  local: {
    appUrl: 'http://localhost:3000',
    dbUrl: 'mongodb://127.0.0.1:27017/express_web_sockets',
  },
  dev: {
    appUrl: 'http://localhost:3000',
    dbUrl: 'mongodb://127.0.0.1:27017/express_web_sockets',
  },
}

const getConfig = new Config(config[process.env.NODE_ENV || 'local'])

module.exports = getConfig
