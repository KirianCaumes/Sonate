const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const Connector = require('./_connector.js')
const Settings = require('./schemas/settingsSchema')

module.exports = class SettingsModel {
    constructor() { }

    find(params) {
        params ? params : {}
        let conn = new Connector()

        return Settings.find(params).exec()
            .then((datas) => { return datas })
            .catch(e => { throw e })
            .finally(() => { conn.close() })
    }

    save(params) {
        let conn = new Connector()

        let temp = new Settings({
            "name": "nom",
            "inputsSelect": {
                "title": true,
                "artist": true,
                "album": false,
                "yearAlbum": false
            },
            "inputsOptions": {
                "time": true,
                "songs": false
            },
            "api": "byname",
            "inputGame": {
                "title": true,
                "artist": true,
                "album": false,
                "yearAlbum": false
            },
            "infosGame": {
                "title": false,
                "artist": false,
                "album": false,
                "yearAlbum": false
            },
            "hint": {
                "country": true,
                "flag": true,
                "band": true,
                "styles": true,
                "members": true,
                "labels": true,
                "letters": true,
                "art": true
            }
        })

        return temp.save()
            .then((datas) => { return datas })
            .catch(e => { throw e })
            .finally(() => { conn.close() })
    }
}