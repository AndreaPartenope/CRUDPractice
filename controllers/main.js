const getUser = (req, res, db) => {
    db.select('*').from('users')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
}
const postUser = (req, res, db) => {
    const { email, username, password } = req.body
    const added = new Date()
    db('users').insert({email, username, password})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
const putUser = (req, res, db) => {
    const { email, username, password } = req.body
    db('users').where({email}).update({email, username, password})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
const deleteUser = (req, res, db) => {
    const { email } = req.body
    db('users').where({email}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

const getSession = (req, res, db) => {
    db.select('*').from('session-pool')
      .then(items => {
        if(items.length){
          res.json(items)
        } else {
          res.json({dataExists: 'false'})
        }
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
const postSession = (req, res, db) => {
    const { id, sessionid, token, sessionname } = req.body
    const added = new Date()
    db('session-pool').insert({id, sessionid, token,sessionname})
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const putSession = (req, res, db) => {
    const { id, sessionid, token, sessionname  } = req.body
    db('session-pool').where({id}).update({id, sessionid, token, sessionname })
      .returning('*')
      .then(item => {
        res.json(item)
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }
  
  const deleteSession = (req, res, db) => {
    const { id } = req.body
    db('session-pool').where({id}).del()
      .then(() => {
        res.json({delete: 'true'})
      })
      .catch(err => res.status(400).json({dbError: 'db error'}))
  }

  module.exports = {
    getUser,
    postUser,
    putUser,
    deleteUser,
    getSession,
    postSession,
    putSession,
    deleteSession
  }