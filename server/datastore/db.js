const mysql = require('mysql')

let connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345',
  database: 'gamesIndustry'
})

connection.connect((err) => {
  if (err) {
    throw err
  } else {
    console.log('connect')
  }
})

module.exports = connection
