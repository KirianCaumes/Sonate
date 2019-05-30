const UserModel = require('../models/usersModel')
const Connector = require('../models/_connector')
const Jwt = require('../helpers/jwt')

module.exports = class UsersController {
    static register(req, res, next) {
        // let conn = new Connector()
        const { username, password, password2 } = req.body

        if (!username || !password || !password2) return res.status(400).json({ error: 'Veuillez entrer un nom d\'utilisateur et un mot de passe' })
        if (password !== password2) return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' })

        let newUser = new UserModel({
            username: username,
            password: password
        })
        newUser.save((err) => {
            if (err) return res.status(400).json({ error: 'Le nom d\'utilisateur est déja utilisé' })
            // conn.close()
            res.json({ success: true, message: 'Vous vous êtes bien inscrit !' })
        })
    }

    static login(req, res, next) {
        // let conn = new Connector()
        const { username, password } = req.body
        UserModel.findOne({ username })
            .then(user => {
                if (!user) return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" })
                new UserModel().comparePassword(password, user.password, (err, isMatch) => {
                    if (err) return res.status(400).json({ error: err })
                    if (isMatch) {
                        Jwt.sign(user, ((err, token) => {
                            if (err) res.status(500).json({ error: "Error signing token", raw: err })
                            res.json({ success: true, token: `Bearer ${token}` })
                        }))
                    } else {
                        res.status(400).json({ error: "Le mot de passe est incorrect" })
                    }
                    // conn.close()
                })
            })
    }

    static test(req, res, next) {
        res.send("Youre logged in !!")
    }
}