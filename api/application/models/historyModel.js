const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    username: String,
    level: String,
    time: Number,
    songs: {
        found: Number,
        total: Number
    },
    date: { type: Date, default: new Date() }
})

module.exports = mongoose.model('History', schema, 'history')
