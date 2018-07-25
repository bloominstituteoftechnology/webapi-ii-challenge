// import your node modules
const express = require('express')
const db = require('./data/db.js')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

server.get('/api/posts', (req, res) => {
  db
    .find()
    .then((post) => res.status(200).json(post))
    .catch((err) =>
      res
        .status(500)
        .json({ error: 'The posts information could not be retrieved.' })
    )
})

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id)
    if (post.length > 0) {
      res.status(200).json(post)
    } else {
      res.status(404).json({ message: 'id not found ' })
    }
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' })
  }
})

server.post('/api/posts', async (req, res) => {
  try {
    !req.body.title || !req.body.contents
      ? res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      })
      : res.status(200).json(await db.insert(req.body))
  } catch (err) {
    res.status(500).json({
      error: 'There was an error while saving the post to the database'
    })
  }
})

server.put('/api/posts/:id', async (req, res) => {
  let id = await db.findById(req.params.id)
  try {
    !req.body.title || !req.body.contents
      ? res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      })
      : id.length > 0
        ? (await db.update(req.params.id, req.body)) &&
          res.status(200).json(await db.findById(req.params.id))
        : res
          .status(404)
          .json({ message: 'The post with the specified ID does not exist.' })
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The post information could not be modified.' })
  }
})

server.delete('/api/posts/:id', async (req, res) => {
  let id = await db.findById(req.params.id)
  try {
    id.length > 0
      ? res.status(200).json(await db.remove(req.params.id))
      : res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' })
  } catch (err) {
    res.status(500).json({ error: 'The post could not be removed' })
  }
})

server.listen(8000, () => console.log('API RUNNING ...'))
