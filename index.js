const express = require('express')

const db = require('./data/db.js')

const server = express()
server.use(express.json())


server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body
  console.log(req.body)

  if(!title || !contents) {
    res.status(400)
    .json({ error: "Please provide title and contents for the post."})
  } else {
    db.insert(req.body)
    .then(newUser => {
      res.status(201).json(newUser)
    })
    .catch(() => {
      res.status(500).json({
         error: "There was an error while saving the post to the database"
      })
    })
  }
})


















server.listen(4000, () => {
  console.log('Server is listening on port 4000')
})