const { Strategy, ExtractJwt } = require('passport-jwt')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
}
