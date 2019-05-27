const SettingsModel = require('../models/settingsModel')
const LevelsModel = require('../models/levelsModel')
const GoogleTradLangsModel = require('../models/googleTradLangsModel')
const CountriesModel = require('../models/countriesModel')

module.exports = class ConstantsController {
    static getConstants(req, res, next) {
        let array = []
        array.push(new SettingsModel().find())
        array.push(new LevelsModel().find())
        array.push(new GoogleTradLangsModel().find())
        array.push(new CountriesModel().find())

        Promise.all(array)
            .then(datas => {
                res.json({
                    settings: datas[0],
                    levels: datas[1],
                    googleTradLangs: datas[2],
                    countries: datas[3],
                })
            })
            .catch(e => {
                res.json({ error: e })
            })
    }
}