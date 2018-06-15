const express = require('express')
const router = express.Router()
const newsService = require('./service')

router.get('/news/:id', (req, res, next) => {
  newsService.getSingleNew(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/news', (req, res, next) => {
  newsService.getNews(req.query)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/allNews', (req, res, next) => {
  newsService.getAllNews(req.query)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/news/championship/:id', (req, res, next) => {
  newsService.getNewToChampionship(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/news/game/:id', (req, res, next) => {
  newsService.getNewToGame(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/comments/game/:id', (req, res, next) => {
  newsService.getCommentsToGame(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/comments/news/:id', (req, res, next) => {
  newsService.getCommentsToGame(req.params.id)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.post('/news/game', (req, res, next) => {
  newsService.addNewToGame(req.body)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.post('/news/championship', (req, res, next) => {
  newsService.addNewToChampionship(req.body)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.post('/comments/game', (req, res, next) => {
  newsService.addCommentToGame(req.body)
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
