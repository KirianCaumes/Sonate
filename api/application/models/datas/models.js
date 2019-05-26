const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

module.exports = {
    settings: mongoose.model(
        'settings',
        new mongoose.Schema({
            _id: ObjectId,
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
    ),
    levels: mongoose.model(
        'levels',
        new mongoose.Schema({
            _id: ObjectId,
            name: String,
            time: String,
            songs: Number
        })
    ),
    googleTradLang: mongoose.model(
        'googleTradLang',
        new mongoose.Schema({
            _id: ObjectId,
            long: String,
            short: String
        })
    ),
    country: mongoose.model(
        'country',
        new mongoose.Schema({
            _id: ObjectId,
            en: String,
            fr: String
        })
    )
}