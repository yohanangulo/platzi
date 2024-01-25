const { Strategy, ExtractJwt } = require('passport-jwt')
const { config } = require('../../../config/config')
const passport = require('passport')
const boom = require('@hapi/boom')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
}

const JwtStrategy = new Strategy(options, (payload, done) => {
  return done(null, payload)
})

function authenticateJwt(req, res, next) {
  passport.authenticate('jwt', { session: false }, (err, user) => {
    if (!user) {
      next(boom.unauthorized())
      return
    }

    req.user = user
    next()
  })(req, res, next)
}

module.exports = { JwtStrategy, authenticateJwt }
