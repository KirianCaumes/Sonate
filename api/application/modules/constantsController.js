const ConstantsModel = require('../models/constantsModel')
const mongoose = require('mongoose')
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

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
        mongoose.connect('mongodb://mongo-sonate-dev/settings', { useNewUrlParser: true })
        let db = mongoose.connection;
        db.on('error', console.error.bind(console, 'connection error:'))
        db.once('open', function () {
            // we're connected!
        })

        let Test = mongoose.model('Test', new Schema({
            _id: ObjectId,
            value: String
        }))

        var coucou = new Test({ value: 'bleu' });
        console.log(coucou.name);

        res.json({ coucou: "oui" })
    }
}