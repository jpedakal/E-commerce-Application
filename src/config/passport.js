const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;
const mongo = require('../database/mongo_db');
const errHandler = require('../utils/exceptionHandler');
const secret = 'WELCOME_1';

module.exports = function (passport) {
  let opts = {};
  opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
  opts.secretOrKey = secret;
  passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
    mongo.findDocuments('user', { cpf: jwt_payload.data })
      .then(user => {
        if (user) return done(null, user);
        else return done(null, false);
      }).catch(err => done(err, false));
  }));
};
