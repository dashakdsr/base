const connection = require('../datastore/db')

const getFiles = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM File`, [], (err, result, docs) => {
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

const getFileByGame = (gameId) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM File WHERE gameId = ?`, [gameId], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select popular', result)
      resolve(result)
    })
  })
}

module.exports.getFiles = getFiles
module.exports.getFileByGame = getFileByGame
