const express = require('express')
const router = express.Router()
const gameService = require('./service')

// router.get('/', (req, res) => {
//   connection.query('SELECT * FROM table1', (err, rows, docs) => {
//     if (err) {
//       throw err
//     } else {
//       console.log('succesful', docs)
//       res.json(rows)
//     }
//   })
// })

router.get('/games/:id', (req, res, next) => {
  gameService.getSingleGame(req.params.id)
    .then((result) => {
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.post('/games/upcoming', (req, res, next) => {
  gameService.getUpcomingGames(req.query.date)
    .then((result) => {
      console.log('result', result)
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
      console.log('result', result)
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
