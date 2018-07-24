// import your node modules
const express = require('express')
const db = require('./data/db.js')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find()
    res.status(200).json(posts)
  } catch (err) {
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' })
  }
})

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id)
    res.status(200).json(post)
  } catch (err) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' })
  }
})

server.post('/api/posts', async (req, res) => {
  try {
    const newPost = req.body
    const post = await db.insert(newPost)
    res.status(200).json(post)
  } catch (err) {
    res
      .status(400)
      .json({ errorMessage: 'Please provide title and contents for the post.' })
  }
})

server.put('/api/posts/:id', async (req, res) => {
  try {
    const post = req.body
    const id = req.params.id
    const updatedPost = await db.update(id, post)
    res.status(200).json(updatedPost)
  } catch (err) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' })
  }
})

server.listen(8000, () => console.log('API RUNNING ...'))
