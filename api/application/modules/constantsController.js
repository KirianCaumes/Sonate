const ConstantsModel = require('../models/constantsModel')

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
}