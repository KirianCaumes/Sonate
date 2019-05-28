const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    en: String,
    fr: String
})

module.exports = mongoose.model('Countries', schema, 'countries')
