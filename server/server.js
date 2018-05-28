const http = require('http')
const app = require('./app')

let port = process.env.PORT || 3141

// app.get('/', (req, res) => {
//   connection.query('SELECT * FROM table1', (err, rows, docs) => {
//     if (err) {
//       throw err
//     } else {
//       console.log('succesful', docs)
//       res.json(rows)
//     }
//   })
// })

app.set('port', port)

let server = http.createServer(app)

server.listen(port)
