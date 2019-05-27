const AbstractModel = require('./_abstractModel')

module.exports = class CountriesModel extends AbstractModel {
    constructor() {
        super()
    }

    find(params) {
        return super.find(
            require('./schemas/countriesSchema'),
            params
        )
    }
}