// const mysql = require('mysql')
const connection = require('../datastore/db')
const moment = require('moment')

const getSingleGame = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game WHERE gameId = ?`, [id], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getUpcomingGames = () => {
  return new Promise((resolve, reject) => {
    let maxDate = moment().add(60, 'days').format('YYYY-MM-DD HH:mm:ss')
    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss')
    connection.query(`SELECT * FROM Game WHERE ? < gameDateRelease AND gameDateRelease < ?`, [currentDate, maxDate], (err, result, docs) => {
      if (err) {
        console.log('err', err)
        reject(err)
      }
      console.log('succesful select upcoming', result)
      resolve(result)
    })
  })
}

const getPopularGames = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game ORDER BY rate DESC LIMIT 10`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select popular', result)
      resolve(result)
    })
  })
}

const getGames = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game`, [], (err, result, docs) => {
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

const addGame = (game) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO Game (gameName, gameDesc, gameImage, gameRequirements, gameDateRelease) VALUES (?, ?, ?, ?, ?)`, [game.gameName, game.gameDesc, game.gameImage, game.gameRequirements, game.gameDateRelease], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      if (game.category && game.category.length > 0) {
        game.category.forEach(item => {
          connection.query(`SELECT categoryId from Category WHERE categoryName = ?`, [item], (err, res, docs) => {
            if (err) {
              reject(err)
            }
            connection.query(`INSERT INTO CategoryGame (gameId, categoryId) VALUES (?, ?)`, [result.insertId, res[0].categoryId], (err, response, docs) => {
              if (err) {
                reject(err)
              }
            })
          })
        })
      }
      if (game.tags && game.tags.length > 0) {
        game.tags.forEach(item => {
          connection.query(`SELECT tagId from Tag WHERE tagName = ?`, [item], (err, res, docs) => {
            if (err) {
              reject(err)
            }
            connection.query(`INSERT INTO TagsGame (gameId, tagId) VALUES (?, ?)`, [result.insertId, res[0].tagId], (err, response, docs) => {
              if (err) {
                reject(err)
              }
            })
          })
        })
      }
      if (game.platforms && game.platforms.length > 0) {
        game.platforms.forEach(item => {
          connection.query(`SELECT platformId from Platform WHERE platformName = ?`, [item], (err, res, docs) => {
            if (err) {
              reject(err)
            }
            connection.query(`INSERT INTO PlatformGame (gameId, platformId) VALUES (?, ?)`, [result.insertId, res[0].platformId], (err, response, docs) => {
              if (err) {
                reject(err)
              }
            })
          })
        })
      }
      if (game.episodes && game.episodes.length > 0) {
        game.episodes.forEach(item => {
          connection.query(`SELECT episodeId from Episode WHERE episodeName = ?`, [item], (err, res, docs) => {
            if (err) {
              reject(err)
            }
            connection.query(`INSERT INTO EpisodeGame (gameId, episodeId) VALUES (?, ?)`, [result.insertId, res[0].episodeId], (err, response, docs) => {
              if (err) {
                reject(err)
              }
            })
          })
        })
      }
      if (game.companies && game.companies.length > 0) {
        game.companies.forEach(item => {
          connection.query(`SELECT companyId from Company WHERE companyName = ?`, [item], (err, res, docs) => {
            if (err) {
              reject(err)
            }
            connection.query(`INSERT INTO CompanyGame (gameId, companyId) VALUES (?, ?)`, [result.insertId, res[0].companyId], (err, response, docs) => {
              if (err) {
                reject(err)
              }
            })
          })
        })
      }
      resolve(result)
      console.log('succesful select games', result, docs)
    })
  })
}

module.exports.getSingleGame = getSingleGame
module.exports.getUpcomingGames = getUpcomingGames
module.exports.getPopularGames = getPopularGames
module.exports.getGames = getGames
module.exports.addGame = addGame
