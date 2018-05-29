const connection = require('../datastore/db')

const getGamesByCategory = (category) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM CategoryGame WHERE categoryId = ?)`, [category], (err, result, docs) => {
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
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM CompanyGame WHERE companyId = ?)`, [company], (err, result, docs) => {
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
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM TagsGame WHERE tagId = ?)`, [tag], (err, result, docs) => {
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
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM PlatformGame WHERE platformId = ?)`, [platform], (err, result, docs) => {
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
    connection.query(`SELECT * FROM Game WHERE gameId IN (SELECT gameId FROM EpisodeGame WHERE episodeId = ?)`, [episode], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const getCategories = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Category`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select games', result)
      resolve(result)
    })
  })
}

const getCompanies = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Company`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select games', result)
      resolve(result)
    })
  })
}

const getPlatforms = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Platform`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select games', result)
      resolve(result)
    })
  })
}

const getEpisodes = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Episode`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select games', result)
      resolve(result)
    })
  })
}

const getTags = () => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT * FROM Tag`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select games', result)
      resolve(result)
    })
  })
}

const processing = {
  getGamesByCategory: getGamesByCategory,
  getGamesByCompany: getGamesByCompany,
  getGamesByTag: getGamesByTag,
  getGamesByPlatform: getGamesByPlatform,
  getGamesByEpisode: getGamesByEpisode,
  data: []
}

const getGamesMultiple = (data, methodName) => {
  return Promise.all(() => data.forEach(element => {
    return processing[methodName](element)
  })).then(games => {
    resolve({games: games})
  })
}

const filter = (currentArray) => {
  processing.data = currentArray.filter(prevItem => !processing.data.find(item => prevItem.gameId === item.gameId))
  return processing.data
}

module.exports.getGamesByCategory = getGamesByCategory
module.exports.getGamesByCompany = getGamesByCompany
module.exports.getGamesByTag = getGamesByTag
module.exports.getGamesByPlatform = getGamesByPlatform
module.exports.getGamesByEpisode = getGamesByEpisode
module.exports.getGamesMultiple = getGamesMultiple
module.exports.getCategories = getCategories
module.exports.getCompanies = getCompanies
module.exports.getPlatforms = getPlatforms
module.exports.getEpisodes = getEpisodes
module.exports.getTags = getTags
module.exports.filter = filter
