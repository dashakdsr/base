const express = require('express')
const router = express.Router()
const fileService = require('./service')

router.get('/files', (req, res, next) => {
  fileService.getfiles(req.query)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/files/:gameId', (req, res, next) => {
  fileService.getFileByGame(req.params.id)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
