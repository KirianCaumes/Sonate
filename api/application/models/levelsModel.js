const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name: String,
    time: String,
    songs: Number
})

module.exports = mongoose.model('Levels', schema, 'levels')
