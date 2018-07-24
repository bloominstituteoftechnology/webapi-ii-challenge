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

server.listen(8000, () => console.log('API RUNNING ...'))
