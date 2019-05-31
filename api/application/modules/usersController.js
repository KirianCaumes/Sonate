const UserModel = require('../models/usersModel')
const Jwt = require('../helpers/jwt')

module.exports = class UsersController {
    static register(req, res, next) {
        const { username, password, password2 } = req.body

        if (!username || !password || !password2) return res.status(400).json({ error: 'Veuillez entrer un nom d\'utilisateur et un mot de passe' })
        if (password !== password2) return res.status(400).json({ error: 'Les mots de passe ne correspondent pas' })

        new UserModel({
            username: username,
            password: password
        })
            .save()
            .then(() => res.json({ message: 'Vous vous êtes bien inscrit !' }))
            .catch(() => res.status(400).json({ error: 'Le nom d\'utilisateur est déja utilisé' }))
    }

    static login(req, res, next) {
        const { username, password } = req.body
        
        UserModel.findOne({ username })
            .then(user => {
                if (!user) return res.status(404).json({ error: "L'utilisateur n'a pas été trouvé" })
                new UserModel().comparePassword(password, user.password)
                    .then(isMatch => {
                        if (!isMatch) return res.status(400).json({ error: "Le mot de passe est incorrect" })
                        Jwt.sign(user)
                            .then(token => res.json({ token: `Bearer ${token}` }))
                            .catch(err => res.status(500).json({ error: "Error signing token", raw: err }))
                    })
                    .catch(err => res.status(400).json({ error: err }))
            })
            .catch(err => res.status(500).json({ error: err }))
    }

    static test(req, res, next) {
        res.send("Vous êtes connecté !!")
    }
}