const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('../models/usersModel')
const Connector = require('../models/_connector')

let secret = process.env.SECRET || 'mysweetsecret'

// Logique d'authentification JWT
module.exports = function (passport) {
    // let conn = new Connector()
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    }
    passport.use(new JwtStrategy(opts, function (jwt_payload, done) {
        UserModel.findOne({ _id: jwt_payload.id }, function (err, user) {
            // conn.close()
            if (err) {
                return done(err, false)
            }
            if (user) {
                done(null, user)
            } else {
                done(null, user)
            }
        })
    }))
}