const app = require('express')()
const cors = require('cors')

const routes = require('./routes.js')


app.use(cors())

const PORT = 5000
const HOST = '127.0.0.1'

routes.setRequestUrl(app)
app.listen(PORT, HOST)
console.log(`Running on http://${HOST}:${PORT}`)

