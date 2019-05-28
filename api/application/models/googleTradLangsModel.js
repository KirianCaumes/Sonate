const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    long: String,
    short: String
})

module.exports = mongoose.model('GoogleTradLangs', schema, 'googleTradLangs')
