const rp = require('request-promise');
const Parse = require('./calc/parse')
const Help = require('../helpers/help')
const COUNTRIES = require("./datas/countries.json")
const LANGUAGES = require("./datas/languages.json")
const LANGGOOGLE = require('./datas/langGoogleTrad')
const SETTINGS = require("./datas/modes.json")
const LEVELS = require("./datas/level.json")

module.exports = class ConstantesModel {
    //Translates english coutry to french
    static getCountries() {
        let countries = COUNTRIES.map(x => {
            return {
                en: x.name.common.toLowerCase(),
                fr: x.translations.fra.common.toLowerCase()
            }
            
        })
        countries.push({ en: "england", fr: "angleterre" })
        return countries
    }

    //Lang for google translate
    static getLang() {
        let countries = []
        LANGUAGES.forEach(e => {
            if (e.alpha2 && e.French && LANGGOOGLE.data.languages.find(x => x.language === e.alpha2)) {
                let long = e.French.split(';')[0]
                long = long.split('(')[0]
                long = long.charAt(0).toUpperCase() + long.slice(1)
                countries.push({ long: long, short: e.alpha2 })
            }            
        });
        countries.sort((a, b) => {
            if (a.long.toLowerCase() < b.long.toLowerCase()) return -1
            if (a.long.toLowerCase() > b.long.toLowerCase()) return 1
            return 0;
        });
        return countries
    }

    static getSettings(){
        return SETTINGS
    }

    static getLevels(){
        return LEVELS
    }
}