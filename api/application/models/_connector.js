const mongoose = require('mongoose')
const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

module.exports = class Connector {
    constructor() {
        mongoose.connect('mongodb://@mongo-sonate-dev/sonate', { user: 'root', pass: 'root', auth: { authdb: "admin" }, useNewUrlParser: true })
        this.conn = mongoose.connection
    }

    close(){
        this.conn.close()
    }
    // run(){

    // }

    // run(callback) {
    //     this.conn.on('error', console.error.bind(console, 'connection error:'))
    //     return this.conn.once('open', callback)
    //     // this.conn.close()
    // }
}