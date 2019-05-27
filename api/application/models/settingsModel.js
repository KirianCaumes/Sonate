const AbstractModel = require('./_abstractModel')

module.exports = class SettingsModel extends AbstractModel {
    constructor() {
        super()
    }

    find(params) {
        return super.find(
            require('./schemas/settingsSchema'),
            params
        )
    }
}