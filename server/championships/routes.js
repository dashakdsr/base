const express = require('express')
const router = express.Router()
const championshipService = require('./service')

router.get('/championships/:id', (req, res, next) => {
  championshipService.getSingleChampionship(req.params.id)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/championships', (req, res, next) => {
  championshipService.getChampionships(req.query)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
