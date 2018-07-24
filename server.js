// import your node modules
const express = require('express')
const db = require('./data/db.js')
const helmet = require('helmet')

const server = express()

server.use(express.json())
server.use(helmet())

const catchError = async (err, res) => {
  if (err.code === 'SQLITE_ERROR') {
    return res.status(500).json({ error: 'The post could not be removed' })
  } else {
    return res
      .status(404)
      .json({ message: 'The post with the specified ID does not exist.' })
  }
}
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

//   try {
//     const posts = await db.find()
//     res.status(200).json(posts)
//   } catch (err) {
//     res
//       .status(500)
//       .json({ error: 'The posts information could not be retrieved.' })
//   }
// })

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

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const postId = req.params.id
    const deletedPost = await db.remove(postId)
    res.status(200).json(deletedPost)
  } catch (err) {
    await catchError(err, res)
  }
})

server.listen(8000, () => console.log('API RUNNING ...'))
