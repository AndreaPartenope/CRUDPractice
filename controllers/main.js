const getSession = (req, res, db) => {
  db.select('*').from('session-pool')
    .then(items => {
      if (items.length) {
        res.json(items)
      } else {
        res.json({ dataExists: 'false' })
      }
    })
    .catch(err => res.status(400).json({ dbError: 'db error', err }))
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
const deleteSession = (req, res, db) => {
  const { id } = req.body
  db('session-pool').where({ id }).del()
    .returning('*')
    .then(() => {
      res.json({ id: id })
    })
    .catch(err => res.status(400).json({ dbError: 'db error', err }))
}
module.exports = {
  getSession,
  postSession,
  deleteSession
}