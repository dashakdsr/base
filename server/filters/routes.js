const express = require('express')
const router = express.Router()
const filterService = require('./service')

router.post('/games-by-category', async (req, res, next) => {
  let query = {
    tags: req.body.tags,
    categories: req.body.categories,
    platforms: req.body.platforms,
    episodes: req.body.episodes,
    companies: req.body.companies,
    response: []
  }
  filterService.clearArray()
  if (query.tags.length > 0) {
    await filterService.getGamesMultiple(query.tags, 'getGamesByTag').then((result) => {
      query.response = filterService.filter(result)
    }).catch((e) => {
      console.log('error', e)
    })
  }
  if (query.categories.length > 0) {
    await filterService.getGamesMultiple(query.categories, 'getGamesByCategory').then((result) => {
      query.response = filterService.filter(result)
    }).catch((e) => {
      console.log('error', e)
    })
  }
  if (query.platforms.length > 0) {
    await filterService.getGamesMultiple(query.platforms, 'getGamesByPlatform').then((result) => {
      query.response = filterService.filter(result)
    }).catch((e) => {
      console.log('error', e)
    })
  }
  if (query.episodes.length > 0) {
    await filterService.getGamesMultiple(query.episodes, 'getGamesByEpisode').then((result) => {
      query.response = filterService.filter(result)
    }).catch((e) => {
      console.log('error', e)
    })
  }
  if (query.companies.length > 0) {
    await filterService.getGamesMultiple(query.companies, 'getGamesByCompany').then((result) => {
      query.response = filterService.filter(result)
    }).catch((e) => {
      console.log('error', e)
    })
  }
  await res.json(query.response)
})

router.get('/categories', (req, res, next) => {
  filterService.getCategories()
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/tags', (req, res, next) => {
  filterService.getTags()
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/episodes', (req, res, next) => {
  filterService.getEpisodes()
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/companies', (req, res, next) => {
  filterService.getCompanies()
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

router.get('/platforms', (req, res, next) => {
  filterService.getPlatforms()
    .then((result) => {
      res.json(result)
    })
    .catch(error => console.error(error))
})

module.exports = router
