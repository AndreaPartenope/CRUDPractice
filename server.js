const express = require('express')

// use process.env variables to keep private variables,
require('dotenv').config()

// Express Middleware
const helmet = require('helmet') // creates headers that protect from attacks (security)
const bodyParser = require('body-parser') // turns response into usable format
const cors = require('cors')  // allows/disallows cross-site communication
const morgan = require('morgan') // logs requests

var db = require('knex')({
  client: 'pg',
  connection: {
    host: 'rajje.db.elephantsql.com',
    user: 'delbyfkx',
    password: 'cyK_NlDmMDkMXqc6_yNxYjknqG83ERXW',
    database: 'delbyfkx'
  }
});

// Controllers - aka, the db queries
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
app.use(morgan('combined')) // use 'tiny' or 'combined'

// App Routes - Auth
app.get('/', (req, res) => res.send('hello world'))
app.get('/user', (req, res) => main.getUser(req, res, db))
app.put('/email', (req,res) => main.getEmail(req,res,db))
app.post('/user', (req, res) => main.postUser(req, res, db))
app.put('/user', (req, res) => main.putUser(req, res, db))
app.delete('/user', (req, res) => main.deleteUser(req, res, db))
app.get('/session', (req, res) => main.getSession(req, res, db))
app.post('/session', (req, res) => main.postSession(req, res, db))
app.put('/session', (req, res) => main.putSession(req, res, db))
app.delete('/session', (req, res) => main.deleteSession(req, res, db))

// App Server Connection
app.listen(process.env.PORT || 3030, () => {
  console.log(`app is running on port ${process.env.PORT || 3030}`)
})