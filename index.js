// import modules
const db = require('./data/db.js')
const express = require('express')

// start and configure server
const server = express()
const port = 5000

server.use(express.json())

// configure routes

// get all posts
server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find()
    res.status(200).json(posts)
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The posts information could not be retrieved.' })
  }
})

// get specific post
server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.findById(req.params.id)
    if (post) {
      res.status(200).json(post)
    } else {
      res
        .status(404)
        .json({ message: 'The post with the specified ID does not exist.' })
    }
  } catch (error) {
    res
      .status(500)
      .json({ error: 'The post information could not be retrieved.' })
  }
})

// post to db
server.post('/api/posts', async (req, res) => {
  const { title, contents } = req.body
  if (!title || !contents) {
    res
      .status(400)
      .json({ error: 'Please provide title and contents for the post.' })
  } else {
    try {
      const newPost = await db.insert(req.body)
      const post = await db.findById(newPost.id)
      res.status(201).json(post)
    } catch (error) {
      res.status(500).json({
        error: 'There was an error while saving the post to the database'
      })
    }
  }
})

// update in db
server.put('/api/posts/:id', async (req, res) => {
  if (!db.findById(req.params.id)) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' })
  } else if (!req.body.title || !req.body.contents) {
    res
      .status(400)
      .json({ error: 'Please provide title and contents for the post.' })
  } else {
    try {
      const count = await db.update(req.params.id, req.body)
      if (count) {
        const post = await db.findById(req.params.id)
        res.status(200).json(post)
      } else {
        throw new Error('Post not updated')
      }
    } catch (error) {
      res
        .status(500)
        .json({ error: 'The post information could not be modified.' })
    }
  }
})

// delete from db
server.delete('/api/posts/:id', async (req, res) => {
  const post = await db.findById(req.params.id)

  if (!post) {
    res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' })
  } else {
    try {
      const count = await db.remove(req.params.id)
      if (count) {
        res.status(200).json(post)
      } else {
        throw new Error('Post not deleted')
      }
    } catch (error) {
      res.status(500).json({ error: 'The post could not be removed' })
    }
  }
})

// set up listener
server.listen(port, () =>
  console.log(`Server running on http://localhost:${port}`)
)
