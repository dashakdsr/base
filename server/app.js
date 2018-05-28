const express = require('express')
const bodyParser = require('body-parser')
const games = require('./games/routes')
const filters = require('./filters/routes')
const championships = require('./championships/routes')
const videos = require('./video/routes')
const files = require('./files/routes')

let app = express()
app.use(bodyParser.json())

app.use('/api/', games)
app.use('/api/', filters)
app.use('/api/', championships)
app.use('/api/', videos)
app.use('/api/', files)

module.exports = app
