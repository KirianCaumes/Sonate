import COUNTRIES from "../datas/countries.json"

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
}