const connection = require('../datastore/db')

const getChampionships = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Championship`, [], (err, result, docs) => {
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

const getSingleChampionship = (id) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Championship WHERE championshipId = ?`, [id], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

module.exports.getChampionships = getChampionships
module.exports.getSingleChampionship = getSingleChampionship
