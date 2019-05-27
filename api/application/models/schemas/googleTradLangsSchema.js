const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let schema = new mongoose.Schema({
    long: String,
    short: String
})

module.exports = mongoose.model('GoogleTradLangs', schema, 'googleTradLangs')
