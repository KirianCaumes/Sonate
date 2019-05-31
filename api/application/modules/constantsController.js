const SettingsModel = require('../models/settingsModel')
const LevelsModel = require('../models/levelsModel')
const GoogleTradLangsModel = require('../models/googleTradLangsModel')
const CountriesModel = require('../models/countriesModel')

module.exports = class ConstantsController {
    static getConstants(req, res, next) {
        let array = []
        array.push(SettingsModel.find().then(data => { return data }))
        array.push(LevelsModel.find().then(data => { return data }))
        array.push(GoogleTradLangsModel.find().then(data => { return data }))
        array.push(CountriesModel.find().then(data => { return data }))

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