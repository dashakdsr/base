const express = require('express')
const router = express.Router()
const videoService = require('./service')

router.get('/videos', (req, res, next) => {
  videoService.getVideos(req.query)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/videos/:gameId', (req, res, next) => {
  videoService.getVideoByGame(req.params.id)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/trailers/:gameId', (req, res, next) => {
  videoService.getTrailersByGame(req.params.id)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
