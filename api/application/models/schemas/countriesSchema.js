const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

let schema = new mongoose.Schema({
    en: String,
    fr: String
})

module.exports = mongoose.model('Countries', schema, 'countries')
