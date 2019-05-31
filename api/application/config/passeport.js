const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const UserModel = require('../models/usersModel')

let secret = process.env.SECRET || 'mysweetsecret'

// Logique d'authentification JWT
module.exports = (passport) => {
    let opts = {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: secret
    }
    passport.use(new JwtStrategy(opts, (jwt_payload, done) => {
        UserModel.findOne({ _id: jwt_payload.id }, (err, user) => {
            if (err) return done(err, false)
            done(null, user)            
        })
    }))
}