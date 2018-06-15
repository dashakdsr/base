const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')

const games = require('./games/routes')
const filters = require('./filters/routes')
const championships = require('./championships/routes')
const videos = require('./video/routes')
const news = require('./news/routes')
const files = require('./file/routes')
const users = require('./users/routes')

let app = express()
app.use(bodyParser.json())
app.use(cors())

app.use('/api/', games)
app.use('/api/', filters)
app.use('/api/', championships)
app.use('/api/', videos)
app.use('/api/', files)
app.use('/api/', news)
app.use('/api/', users)

module.exports = app
