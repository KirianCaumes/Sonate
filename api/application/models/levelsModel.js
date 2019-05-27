const AbstractModel = require('./_abstractModel')

module.exports = class LevelsModel extends AbstractModel {
    constructor() {
        super()
    }

    find(params) {
        return super.find(
            require('./schemas/levelsSchema'),
            params
        )
    }
}