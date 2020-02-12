const getUser = (req, res, db) => {
  db.select('*').from('users')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error', err }))
}
const getEmail = (req, res, db) => {
  const { email } = req.body
  db('users').select('*').where({ email })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error', err }))
}

const postUser = (req, res, db) => {
  const { email, username, password } = req.body
  db('users').insert({ email, username, password })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error', err }))
}

const putUser = (req, res, db) => {
  const { email, username, password } = req.body
  db('users').where({ email }).update({ email, username, password })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error', err }))
}
const deleteUser = (req, res, db) => {
  const { email } = req.body
  db('users').where({ email }).del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err => res.status(400).json({ dbError: 'db error',err }))
}
const getSession = (req, res, db) => {
  db.select('*').from('session-pool')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error',err }))
}

const postSession = (req, res, db) => {
  const { id, sessionId, token, sessionName } = req.body
  const added = new Date()
  db('session-pool').insert({ id, sessionId, token, sessionName })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error',err }))
}

const putSession = (req, res, db) => {
  const { id, sessionId, token, sessionName } = req.body
  db('session-pool').where({ id }).update({ id, sessionId, token, sessionName })
    .returning('*')
    .then(item => {
      res.json(item)
    })
    .catch(err => res.status(400).json({ dbError: 'db error',err }))
}

const deleteSession = (req, res, db) => {
  const { id } = req.body
  db('session-pool').where({ id }).del()
    .then(() => {
      res.json({ delete: 'true' })
    })
    .catch(err => res.status(400).json({ dbError: 'db error',err }))
}

module.exports = {
  getUser,
  getEmail,
  postUser,
  putUser,
  deleteUser,
  getSession,
  postSession,
  putSession,
  deleteSession
}