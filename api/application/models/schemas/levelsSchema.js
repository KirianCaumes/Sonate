const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let schema = new mongoose.Schema({
    name: String,
    time: String,
    songs: Number
})

module.exports = mongoose.model('Levels', schema, 'levels')
