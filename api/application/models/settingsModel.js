const mongoose = require('mongoose')

let schema = new mongoose.Schema({
    name: String,
    inputsSelect: {
        title: Boolean,
        artist: Boolean,
        album: Boolean,
        yearAlbum: Boolean
    },
    inputsOptions: {
        time: Boolean,
        songs: Boolean
    },
    api: String,
    inputGame: {
        title: Boolean,
        artist: Boolean,
        album: Boolean,
        yearAlbum: Boolean
    },
    infosGame: {
        title: Boolean,
        artist: Boolean,
        album: Boolean,
        yearAlbum: Boolean
    },
    hint: {
        country: Boolean,
        flag: Boolean,
        band: Boolean,
        styles: Boolean,
        members: Boolean,
        labels: Boolean,
        letters: Boolean,
        art: Boolean
    }
})

module.exports = mongoose.model('Settings', schema, 'param_settings')