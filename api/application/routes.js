const songController = require('./modules/songsController')
const constController = require('./modules/constantsController')
const usersController = require('./modules/usersController')
const scoresController = require('./modules/historyController')
const path = require('path')
const express = require('express')
const fs = require('fs')
const passport = require('passport')

const apiRouter = express.Router()
const constantsRouter = express.Router()
const songsRouter = express.Router()
const usersRouter = express.Router()
const historyRouter = express.Router()

exports.setRequestUrl = (app) => {
    app.use('/api', apiRouter)
    apiRouter.use('/constants', constantsRouter)
    apiRouter.use('/song', songsRouter)
    apiRouter.use('/user', usersRouter)
    apiRouter.use('/scores', historyRouter)
 
    //ex: http://localhost:5000/api/constants
    constantsRouter.get('', passport.authenticate('jwt', { session: false }), constController.getConstants)

    //ex: http://localhost:5000/api/song/byname?song=abnegation&band=in%20flames&lang=fr
    songsRouter.get('/byname', passport.authenticate('jwt', { session: false }), songController.getByName)
    //ex: http://localhost:5000/api/song/byband?band=in%20flames&lang=fr
    songsRouter.get('/byband', passport.authenticate('jwt', { session: false }), songController.getByBand)
    //ex: http://localhost:5000/api/song/byalbum?band=in%20flames&album=come%20clarity&year=2006&lang=fr
    songsRouter.get('/byalbum', passport.authenticate('jwt', { session: false }), songController.getByAlbum)
    //ex: http://localhost:5000/api/song/art?band=in%20flames&album=come%20clarity&year=2006
    songsRouter.get('/art', passport.authenticate('jwt', { session: false }), songController.getArt)
    //ex: http://localhost:5000/api/song/clues?band=in%20flames
    songsRouter.get('/clues', passport.authenticate('jwt', { session: false }), songController.getClues)

    //ex: http://localhost:5000/api/user/register  { username: 'test', password: 'pass' }
    usersRouter.post('/register', usersController.register)
    //ex: http://localhost:5000/api/user/login  { username: 'test', password: 'pass' }
    usersRouter.post('/login', usersController.login)
    //ex: http://localhost:5000/api/user/test  (with token in header)
    usersRouter.get('/test', passport.authenticate('jwt', { session: false }), usersController.test)

    //ex: http://localhost:5000/api/scores/history
    historyRouter.get('/history', passport.authenticate('jwt', { session: false }), scoresController.getHistory)
    //ex: http://localhost:5000/api/scores/history
    historyRouter.post('/history', passport.authenticate('jwt', { session: false }), scoresController.postHistory)

    // Render React App Build 
    if (fs.existsSync('../front/build/')) {
        app.use(express.static(path.join(__dirname, '../../front/build/')))
        app.get('/', (req, res) => res.sendFile('index.html', { root: '../../front/build/' }))
    }

    // Other
    app.get('*', (req, res) => res.status(404).send("Sonate"));
}
