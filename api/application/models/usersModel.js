const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

let schema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

// Enregistrement de l'utilisateur (toujours hasher les mots de passe en production) 
schema.pre('save', function (next) {
    var user = this
    if (this.isModified('password') || this.isNew) {
        bcrypt.genSalt(10, function (err, salt) {
            if (err) {
                return next(err)
            }
            bcrypt.hash(user.password, salt, function (err, hash) {
                if (err) {
                    return next(err)
                }
                user.password = hash
                next()
            })
        })
    } else {
        return next()
    }
})

// Comparaison des mots de passes reçus et en base
schema.methods.comparePassword = (pw, pwUser, cb) => {
    bcrypt.compare(pw, pwUser, (err, isMatch) => {
        if (err) return cb(err)
        cb(null, isMatch)
    })
}

module.exports = mongoose.model('User', schema)  