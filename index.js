// import your node modules

const express = require('express')

const cors = require('cors')

const server = express()

const PORT = 3999

const db = require('./data/db.js');

server.use(cors())

// add your server code starting here
server.post('/api/posts/', (req, res) => {
 const { title, contents } = req.body
 db
  .insert({title, contents})
  .then(() => {
   if (title && contents){
    res
     .status(201)
     .send(user)
     .json(user)
   }
   else {
    res
     .status(400)
     .json({errorMessage: "Please provide title and contents for the post."})
   }
  })
  .catch(() => {
   res
    .status(500)
    .json({error: "There was an error while saving the post to the database."})
  })
})

server.get('/api/posts/', (req, res) => {
 db.find()
  .then((posts) => {
   res 
    .json(posts)
  })

  .catch(() => {
   res
   
   .status(500)
    .json({error: "The posts information could not be retrieved"})
  })
})

server.get('/api/posts/id', (req, res) => {
 const { id } = req.params
 db
  .findById(id)
})





server.listen(PORT, () => {
 console.log(`Server is running live on ${PORT}`)
} )