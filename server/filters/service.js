const connection = require('../datastore/db')

const getGamesByCategory = (category) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM CategoryGame WHERE categoryId IN (SELECT categoryId FROM Category WHERE categoryName = ?))`, [category], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getGamesByCompany = (company) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM CompanyGame WHERE companyId IN (SELECT companyId FROM Company WHERE companyName = ?))`, [company], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getGamesByTag = (tag) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM TagsGame WHERE tagId IN (SELECT tagId FROM Tag WHERE tagName = ?))`, [tag], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getGamesByPlatform = (platform) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM PlatformGame WHERE platformId IN (SELECT platformId FROM Tag WHERE platformName = ?))`, [platform], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getGamesByEpisode = (episode) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM EpisodeGame WHERE episodeId IN (SELECT episodeId FROM Tag WHERE episodeName = ?))`, [episode], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

module.exports.getGamesByCategory = getGamesByCategory
module.exports.getGamesByCompany = getGamesByCompany
module.exports.getGamesByTag = getGamesByTag
module.exports.getGamesByPlatform = getGamesByPlatform
module.exports.getGamesByEpisode = getGamesByEpisode
