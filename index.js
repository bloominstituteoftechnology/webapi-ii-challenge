// import your node modules

const express = require('express')

const cors = require('cors')

const server = express()

server.use(server.json(), cors())

const db = require('./data/db.js');

// add your server code starting here

server.post('/api/users/', (req, res) => {
 const { title, contents } = req.body
 db.insert(user = {title, contents})
  if (title, contents){
   res
    .status(201)
    .send(user)
    .json(user)
  }
  else if (!(title, contents)) {
   res
    .status(400)
    .json({errorMessage: "Please provide title and contents for the post."})
  }
})

const PORT = 3999

server.listen(POST, () => {
 console.log(`Server is running live on ${PORT}`)
} )