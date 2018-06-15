const express = require('express')
const router = express.Router()
const userService = require('./service')

router.post('/login', (req, res, next) => {
  console.log('eq body', req.body)
    userService.signIn(req.body).then((user) => {
      console.log('json user', user)
      res.json(user)
    })
    .catch(next)
})

router.post('/registration', (req, res, next) => {
    userService.signUp(req.body).then((user) => {
      res.json(user)
    })
    .catch(next)
})

module.exports = router
