const jwt = require('jsonwebtoken')

let secret = process.env.SECRET || 'mysweetsecret'

module.exports = class Jwt {
    static sign(user, cb) {
        jwt.sign({ id: user._id, username: user.username }, secret, cb)
    }

    static verify(authorization){
        return jwt.verify(authorization.split(' ')[1], secret) || {}
    }
}