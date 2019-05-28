const UserModel = require('../models/usersModel')
const Connector = require('../models/_connector')
const jwt = require('jsonwebtoken')

let secret = process.env.SECRET || 'mysweetsecret'

module.exports = class UsersController {
    static register(req, res, next) {
        // let conn = new Connector()

        if (!req.body.username || !req.body.password) res.json({ success: false, message: 'Please enter username and password.' })

        let newUser = new UserModel({
            username: req.body.username,
            password: req.body.password
        })
        newUser.save((err) => {
            if (err) return res.json({ success: false, message: 'Le nom d\'utilisateur déja utilisé' })
            // conn.close()
            res.json({ success: true, message: 'Créé ! ' })
        })
    }

    static login(req, res, next) {
        // let conn = new Connector()
        const { username, password } = req.body
        UserModel.findOne({ username })
            .then(user => {
                if (!user) return res.status(404).json({ error: "No Account Found" })
                new UserModel().comparePassword(password, user.password, (err, isMatch) => {
                    if (err) return res.status(400).json({ error: err })
                    if (isMatch) {
                        jwt.sign({ id: user._id, name: user.userName }, secret, { expiresIn: 36000 },
                            (err, token) => {
                                if (err) res.status(500).json({ error: "Error signing token", raw: err })
                                res.json({ success: true, token: `Bearer ${token}` })
                            }
                        )
                    } else {
                        res.status(400).json({ error: "Password is incorrect" })
                    }
                    // conn.close()
                })
            })
    }

    static test(req, res, next) {
        res.send("Youre logged in !!")
    }
}