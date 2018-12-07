// import your node modules
const express = require("express")
const server = express()
const db = require("./data/db.js")
server.use(express.json())

const PORT = 8000

// add your server code starting here
server.get("/", (req, res) => {
  res.status(200).send({ message: "request received" })
})
// endpoints
server.get("/api/posts", (req, res) => {
  db.find()
    .then(posts => {
      console.log(`posts`, posts)
      res.status(200).json(posts)
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The posts information could not be retrieved." })
    })
})

server.get("/api/posts/:id", (req, res) => {
  const id = req.params.id
  db.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post)
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    })
})

// post
server.post("/api/posts", (req, res) => {
  const { title, contents } = req.body
  const newPost = { title, contents }

  if (!newPost.title || !newPost.contents) {
    res
      .status(400)
      .json({ errorMessage: "Please provide title and contents for the post." })
      .end()
  } else {
    db.insert(newPost)
      .then(id => {
        res.status(201).json({ "New Post Added with ID#": id })
      })
      .catch(err => {
        console.log(err)
        res
          .status(500)
          .json({
            error: "There was an error while saving the post to the database."
          })
      })
  }
})

// delete
server.delete("/api/posts/:id", (req, res) => {
  const id = req.params.id

  db.remove(id)
    .then(posts => {
      console.log(posts)
      res.status(200).json({ message: "Post successfully deleted." })
    })
    .catch(err => {
      console.log(err)
      res.status(500).json({ error: "The post could not be removed." })
    })
})

// listening
server.listen(PORT, () => {
  console.log(`server is up and running on port ${PORT}`)
})
