const app = require('express')()
const cors = require('cors')
const routes = require('./application/routes.js')

require('dotenv').config()

let PORT = 5000
let HOST = '127.0.0.1'
if (process.env.NODE_ENV === "development") {
    PORT = process.env.PORT_DEV
    HOST = process.env.HOST_DEV
} else if (process.env.NODE_ENV === "production") {
    PORT = process.env.PORT_PROD
    HOST = process.env.HOST_PROD
}

app.use(cors())

routes.setRequestUrl(app)
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

