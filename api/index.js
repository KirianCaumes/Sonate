const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser')
const passport = require('passport')
const routes = require('./application/routes.js')
const mongoose = require('mongoose')

mongoose.connect('mongodb://@mongo-sonate-dev/sonate', { user: 'root', pass: 'root', auth: { authdb: "admin" }, useNewUrlParser: true, useCreateIndex: true })

require('dotenv').config()

let PORT = 5000
let HOST = '0.0.0.0'

if (process.env.NODE_ENV === "development") {
    PORT = process.env.PORT_DEV
    HOST = process.env.HOST_DEV
} else if (process.env.NODE_ENV === "production") {
    PORT = process.env.PORT_PROD
    HOST = process.env.HOST_PROD
}

app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())
app.use(passport.initialize())
require('./application/config/passeport')(passport)

routes.setRequestUrl(app)
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

