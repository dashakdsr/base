const express = require('express')
const router = express.Router()
const filterService = require('./service')

router.post('/games-by-category', (req, res, next) => {
  let query = {
    tags: req.body.tags,
    categories: req.body.categories,
    platforms: req.body.platforms,
    episodes: req.body.episodes,
    companies: req.body.companies,
    response: []
  }
  if (query.tags.length > 0) {
    query.response = filterService.filter(filterService.getGamesMultiple(query.tags, 'getGamesByTag'))
  }
  if (query.categories.length > 0) {
    query.response = filterService.filter(filterService.getGamesMultiple(query.categories, 'getGamesByCategory'))
  }
  if (query.platforms.length > 0) {
    query.response = filterService.filter(filterService.getGamesMultiple(query.platforms, 'getGamesByPlatform'))
  }
  if (query.episodes.length > 0) {
    query.response = filterService.filter(filterService.getGamesMultiple(query.episodes, 'getGamesByEpisode'))
  }
  if (query.companies.length > 0) {
    query.response = filterService.filter(filterService.getGamesMultiple(query.companies, 'getGamesByCompany'))
  }
  res.json(query.response)
})

// router.get('/games-by-category/:tag', (req, res, next) => {
//   filterService.getGamesByTag(req.params.tag)
//     .then((result) => {
//       console.log('result in cstegiry', result)
//       res.json(result)
//     })
//     .catch(error => console.error(error))
// })

// router.get('/games-by-category/:platform', (req, res, next) => {
//   filterService.getGamesByPlatform(req.params.platform)
//     .then((result) => {
//       console.log('result in cstegiry', result)
//       res.json(result)
//     })
//     .catch(error => console.error(error))
// })

// router.get('/games-by-category/:episode', (req, res, next) => {
//   filterService.getGamesByEpisode(req.params.episode)
//     .then((result) => {
//       console.log('result in cstegiry', result)
//       res.json(result)
//     })
//     .catch(error => console.error(error))
// })

module.exports = router
