const songController = require('./modules/song/controller')
const path = require('path')
const express = require('express')
const fs = require('fs')

exports.setRequestUrl = (app) => {
    const baseUrl = "/api"
    const songUrl = "/song"

    // API
    //ex: http://localhost:5000/api/song/byname?song=abnegation&band=in%20flames&lang=fr
    app.get(baseUrl + songUrl + '/byname', songController.getByName)
    //ex: http://localhost:5000/api/song/byband?band=in%20flames&lang=fr
    app.get(baseUrl + songUrl + '/byband', songController.getByBand)
    //ex: http://localhost:5000/api/song/byalbum?band=in%20flames&album=come%20clarity&year=2006&lang=fr
    app.get(baseUrl + songUrl + '/byalbum', songController.getByAlbum)

    //ex: http://localhost:5000/api/song/art?band=in%20flames&album=come%20clarity&year=2006
    app.get(baseUrl + songUrl + '/art', songController.getArt)
    //ex: http://localhost:5000/api/song/clues?band=in%20flames
    app.get(baseUrl + songUrl + '/clues', songController.getClues)

    // Render React App Build 
    if (fs.existsSync('../front/build/')) {
        app.use(express.static(path.join(__dirname, '../front/build/')))
        app.get('/', (req, res) => res.sendFile('index.html', { root: '../front/build/' }))
    }

    // Other
    app.get('*', (req, res) => res.status(404).send("Sonate"));
}
