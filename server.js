const express = require('express')

require('dotenv').config()

const helmet = require('helmet') 
const bodyParser = require('body-parser') 
const cors = require('cors')  
const morgan = require('morgan') 

var db = require('knex')({
  client: 'pg',
  connection: {
    host: 'rajje.db.elephantsql.com',
    user: 'delbyfkx',
    password: 'cyK_NlDmMDkMXqc6_yNxYjknqG83ERXW',
    database: 'delbyfkx'
  }
});
// Controllers
const main = require('./controllers/main')
// App
const app = express()
// App Middleware
const whitelist = ['http://localhost:3000']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1 || !origin) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(helmet())
app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(morgan('combined')) 

app.get('/session', (req, res) => main.getSession(req, res, db))
app.post('/session', (req, res) => main.postSession(req, res, db))
app.put('/session', (req, res) => main.putSession(req, res, db))
app.delete('/session', (req, res) => main.deleteSession(req, res, db))

app.listen(process.env.PORT || 3030, () => {
  console.log(`app is running on port ${process.env.PORT || 3030}`)
})