const connection = require('../datastore/db')

const getNews = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM New`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      if (query.search) {
        result = result.filter(item => item.gameName.toLowerCase().match(query.search.toLowerCase()))
      }
      if (result.length > 10) {
        result = result.slice(query.page === 1 ? 0 : query.page * 10, query.page === 1 ? 10 : query.page * 10 + 10)
      }
      console.log('succesful select games', result)
      resolve(result)
    })
  })
}

const getSingleNew = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM New WHERE newId = ?`, [id], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getNewToChampionship = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newId FROM NewToChampionship WHERE championshipId IN (SELECT championshipId FROM Championship WHERE gameId = ?))`, [id], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getNewToGame = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newId FROM NewToGame WHERE gameId == ? IN (SELECT gameId FROM Game WHERE gameId = ?))`, [id], (err, result, docs) => { // TODO
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getCommentsToGame = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newId FROM CommentsTogame WHERE gameId IN (SELECT gameId FROM Game WHERE gameId = ?))`, [id], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getCommentsToNews = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newId FROM CommentsToNew WHERE newsId IN (SELECT newId FROM New WHERE newId = ?))`, [id], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

module.exports.getNews = getNews
module.exports.getSingleNew = getSingleNew
module.exports.getNewToChampionship = getNewToChampionship
module.exports.getNewToGame = getNewToGame
module.exports.getCommentsToGame = getCommentsToGame
module.exports.getCommentsToNews = getCommentsToNews
