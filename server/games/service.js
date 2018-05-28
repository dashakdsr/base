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

const getUpcomingGames = (date) => {
  return new Promise((resolve, reject) => {
    let maxDate = moment(date).format('YYYY-MM-DD HH:mm:ss')
    let currentDate = moment().format('YYYY-MM-DD HH:mm:ss')
    connection.query(`SELECT * FROM Game WHERE ? < gameDateRelease AND gameDateRelease < ?`, [currentDate, maxDate], (err, result, docs) => {
      if (err) {
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

module.exports.getSingleGame = getSingleGame
module.exports.getUpcomingGames = getUpcomingGames
module.exports.getPopularGames = getPopularGames
module.exports.getGames = getGames
