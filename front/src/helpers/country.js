import COUNTRIES from "../datas/countries.json"
import LANGUAGES from "../datas/languages.json"
import LANGGOOGLE from "../datas/langGoogleTrad.json"

export default class Country {
    static getTrad(country) {
        switch (country.toLowerCase()) {
            case "england":
                return "Angleterre"
            default:
                let obj = COUNTRIES.find(x => x.name.common.toLowerCase() === country.toLowerCase())
                if (obj) return obj.translations.fra.common
                return country
        }
    }

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
}