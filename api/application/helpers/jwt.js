const jwt = require('jsonwebtoken')

let secret = process.env.SECRET || 'mysweetsecret'

module.exports = class Jwt {
    static sign(user) {
        return new Promise((resolve, reject) => {
            jwt.sign({ id: user._id, username: user.username }, secret,
                (err, token) => {
                    if (err) reject(err)                    
                    resolve(token)
                }
            )
        })
    }

    static verify(authorization) {
        return jwt.verify(authorization.split(' ')[1], secret) || {}
    }
}