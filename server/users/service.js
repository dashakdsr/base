const connection = require('../datastore/db')
const { encrypt, decrypt } = require('../middleware/hash')

const signUp = (body) => {
  body.userHash = encrypt(`${body.username}${body.pass}`)
  return new Promise((resolve, reject) => {
      connection.query(
          `INSERT INTO User SET ?`,
          [body],
          (error, results, fields) => {
              if (error) {
                  throw error
              }
              console.log(results)
              resolve(results)
      })
  })
}

const signIn = (body) => {
  return new Promise((resolve, reject) => {
      connection.query(
          `SELECT userId, username FROM User WHERE userHash = ?`,
          [encrypt(`${body.username}${body.pass}`)],
          (error, results, fields) => {
              if (error) {
                  throw error
              }
              console.log(results)
              resolve(results[0])
      })
  })
}

module.exports.signIn = signIn
module.exports.signUp = signUp
