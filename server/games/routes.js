const express = require('express')
const router = express.Router()
const gameService = require('./service')

router.get('/games/single/:id', (req, res, next) => {
  gameService.getSingleGame(req.params.id)
    .then((result) => {
      console.log('result in one game', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/games/upcoming', (req, res, next) => {
  gameService.getUpcomingGames()
    .then((result) => {
      console.log('result in upcoming', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/games/popular', (req, res, next) => {
  gameService.getPopularGames()
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/games', (req, res, next) => {
  gameService.getGames(req.query)
    .then((result) => {
      console.log('result games', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.post('/game', (req, res, next) => {
  console.log('object values', Object.values(req.body))
  gameService.addGame(req.body)
    .then((result) => {
      console.log('result add game', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
