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

const getAllNews = (query) => {
  return new Promise((resolve, reject) => {
    connection.query(`SELECT New.newId, New.newName, New.newDesc, New.newDate, NewToGame.newImage FROM New INNER JOIN NewToGame ON NewToGame.newId = New.newId;
      SELECT New.newId, New.newName, New.newDesc, New.newDate, NewToChampionship.newImage FROM New INNER JOIN NewToChampionship ON NewToChampionship.newId = New.newId`, [], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful select games', result)
      resolve([...result[0], ...result[1]])
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
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newsId FROM NewToChampionship WHERE championshipId IN (SELECT championshipId FROM Championship WHERE championshipId = ?))`, [id], (err, result, docs) => {
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
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newsId FROM NewToGame WHERE gameId IN (SELECT gameId FROM Game WHERE gameId = ?))`, [id], (err, result, docs) => { // TODO
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
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newId FROM CommentToGame WHERE gameId IN (SELECT gameId FROM Game WHERE gameId = ?))`, [id], (err, result, docs) => {
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
    connection.query(`SELECT * FROM New WHERE newId IN (SELECT newId FROM CommentToNews WHERE newsId IN (SELECT newId FROM New WHERE newId = ?))`, [id], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      console.log('succesful', result)
      resolve(result)
    })
  })
}

const addNewToGame = (news) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO New (newName, newDesc, newDate) VALUES (?, ?, ?)`, [news.newName, news.newDesc, news.newDate], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      connection.query(`INSERT INTO NewToGame (gameId, image, newsId) VALUES (?, ?, ?)`, [news.gameId, news.image, result.insertId], (err, res, docs) => {
        if (err) {
          reject(err)
        }
      })
      resolve(result)
    })
  })
}

const addNewToChampionship = (news) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO New (newName, newDesc, newDate) VALUES (?, ?, ?)`, [news.newName, news.newDesc, news.newDate], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      connection.query(`INSERT INTO NewToChampionship (championshipId, image, newsId) VALUES (?, ?, ?)`, [news.championshipId, news.image, result.insertId], (err, res, docs) => {
        if (err) {
          reject(err)
        }
      })
      resolve(result)
    })
  })
}

const addCommentToGame = (news) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO New (newName, newDesc, newDate) VALUES (?, ?, ?)`, [news.newName, news.newDesc, news.newDate], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      connection.query(`INSERT INTO CommentToGame (gameId, userId, newId) VALUES (?, ?, ?)`, [news.gameId, news.userId, result.insertId], (err, res, docs) => {
        if (err) {
          reject(err)
        }
      })
      resolve(result)
    })
  })
}

const addCommentToNew = (news) => {
  return new Promise((resolve, reject) => {
    connection.query(`INSERT INTO New (newName, newDesc, newDate) VALUES (?, ?, ?)`, [news.newName, news.newDesc, news.newDate], (err, result, docs) => {
      if (err) {
        reject(err)
      }
      connection.query(`INSERT INTO CommentToNews (gameId, newsId, newId) VALUES (?, ?, ?)`, [news.gameId, news.newsId, result.insertId], (err, res, docs) => {
        if (err) {
          reject(err)
        }
      })
      resolve(result)
    })
  })
}

module.exports.getNews = getNews
module.exports.getAllNews = getAllNews
module.exports.getSingleNew = getSingleNew
module.exports.getNewToChampionship = getNewToChampionship
module.exports.getNewToGame = getNewToGame
module.exports.getCommentsToGame = getCommentsToGame
module.exports.getCommentsToNews = getCommentsToNews
module.exports.addNewToGame = addNewToGame
module.exports.addNewToChampionship = addNewToChampionship
module.exports.addCommentToGame = addCommentToGame
