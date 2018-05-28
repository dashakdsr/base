const express = require('express')
const router = express.Router()
const filterService = require('./service')

router.get('/games-by-category/:category', (req, res, next) => {
  filterService.getGamesByCategory(req.params.category)
    .then((result) => {
      console.log('result in cstegiry', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/games-by-category/:tag', (req, res, next) => {
  filterService.getGamesByTag(req.params.tag)
    .then((result) => {
      console.log('result in cstegiry', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/games-by-category/:platform', (req, res, next) => {
  filterService.getGamesByPlatform(req.params.platform)
    .then((result) => {
      console.log('result in cstegiry', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/games-by-category/:episode', (req, res, next) => {
  filterService.getGamesByEpisode(req.params.episode)
    .then((result) => {
      console.log('result in cstegiry', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
