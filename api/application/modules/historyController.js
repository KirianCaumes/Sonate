const HistoryModel = require('../models/historyModel')
const Jwt = require('../helpers/jwt')
const ExtractJwt = require('passport-jwt').ExtractJwt

module.exports = class HistoryController {
    static getHistory(req, res, next) {
        HistoryModel
            .find({
                level: { $nin: ['personalisé'] },
                // username: new RegExp(name, "i")
            })
            .limit(50)
            .sort({ date: -1 })
            .then(data => res.json(data))
            .catch(e => res.json({ error: e }))
    }

    static postHistory(req, res, next) {
        console.log({
            username: Jwt.verify(req.headers.authorization).username,
            level: req.body.level,
            time: req.body.time,
            songs: {
                found: req.body.songs.found,
                total: req.body.songs.total
            }
        })
        new HistoryModel({
            username: Jwt.verify(req.headers.authorization).username,
            level: req.body.level,
            time: req.body.time,
            songs: {
                found: req.body.songs.found,
                total: req.body.songs.total
            }
        })
            .save()
            .then(data => res.json({ success: true }))
            .catch(e => res.json({ error: e }))
    }
}