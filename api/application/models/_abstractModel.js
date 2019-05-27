const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId
const Connector = require('./_connector.js')
const Settings = require('./schemas/settingsSchema')

module.exports = class AbstractModel {
    constructor() { }

    find(schema, params = {}) {
        let conn = new Connector()

        return schema.find(params).exec()
            .then((datas) => { return datas })
            .catch(e => { throw e })
            .finally(() => { conn.close() })
    }

    save(schema) {
        let conn = new Connector()
        
        return schema.save()
            .then((datas) => { return datas })
            .catch(e => { throw e })
            .finally(() => { conn.close() })
    }
}