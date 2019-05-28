const songController = require('./modules/songController')
const constController = require('./modules/constantsController')
const usersController = require('./modules/usersController')
const path = require('path')
const express = require('express')
const fs = require('fs')
const passport = require('passport')

exports.setRequestUrl = (app) => {
    const baseUrl = "/api"
    const songUrl = "/song"
    const constUrl = "/constants"
    const userUrl = "/user"

    // API    
    //ex: http://localhost:5000/api/constants
    app.get(baseUrl + constUrl, passport.authenticate('jwt', { session: false }), constController.getConstants)

    //ex: http://localhost:5000/api/song/byname?song=abnegation&band=in%20flames&lang=fr
    app.get(baseUrl + songUrl + '/byname', passport.authenticate('jwt', { session: false }), songController.getByName)
    //ex: http://localhost:5000/api/song/byband?band=in%20flames&lang=fr
    app.get(baseUrl + songUrl + '/byband', passport.authenticate('jwt', { session: false }), songController.getByBand)
    //ex: http://localhost:5000/api/song/byalbum?band=in%20flames&album=come%20clarity&year=2006&lang=fr
    app.get(baseUrl + songUrl + '/byalbum', passport.authenticate('jwt', { session: false }), songController.getByAlbum)

    //ex: http://localhost:5000/api/song/art?band=in%20flames&album=come%20clarity&year=2006
    app.get(baseUrl + songUrl + '/art', passport.authenticate('jwt', { session: false }), songController.getArt)
    //ex: http://localhost:5000/api/song/clues?band=in%20flames
    app.get(baseUrl + songUrl + '/clues', passport.authenticate('jwt', { session: false }), songController.getClues)

    //ex: http://localhost:5000/api/user/register  { username: 'test', password: 'pass' }
    app.post(baseUrl + userUrl + '/register', usersController.register)
    //ex: http://localhost:5000/api/user/login  { username: 'test', password: 'pass' }
    app.post(baseUrl + userUrl + '/login', usersController.login)
    //ex: http://localhost:5000/api/user/test  (with token in header)
    app.get(baseUrl + userUrl + '/test', passport.authenticate('jwt', { session: false }), usersController.test)

    // Render React App Build 
    if (fs.existsSync('../front/build/')) {
        app.use(express.static(path.join(__dirname, '../../front/build/')))
        app.get('/', (req, res) => res.sendFile('index.html', { root: '../../front/build/' }))
    }

    // Other
    app.get('*', (req, res) => res.status(404).send("Sonate"));
}
