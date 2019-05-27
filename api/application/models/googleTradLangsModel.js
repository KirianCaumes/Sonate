const AbstractModel = require('./_abstractModel')

module.exports = class GoogleTradLangsModel extends AbstractModel {
    constructor() {
        super()
    }

    find(params) {
        return super.find(
            require('./schemas/googleTradLangsSchema'),
            params
        )
    }
}