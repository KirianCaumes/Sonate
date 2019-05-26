const ConstantsModel = require('../models/constantsModel')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const SettingsModel = require('../models/settingsModel')

module.exports = class ConstantsController {
    static getConstants(req, res, next) {
        res.json(
            {
                settings: ConstantsModel.getSettings(),
                levels: ConstantsModel.getLevels(),
                googleTradLang: ConstantsModel.getLang(),
                country: ConstantsModel.getCountries()
            }
        )
    }

    static test(req, res, next) {
        let settings = new SettingsModel()

        let array = []
        array.push(settings.find())
        array.push(settings.save())

        Promise.all(array)
            .then(datas => {
                res.json(datas)
            })
            .catch(e => {
                res.send(e)
            })


    }
}