// import your node modules
const express = require('express');
const db = require('./data/db.js');

const PORT = '5000';

// add your server code starting here
const server = express();

//  Requests
//  GETALL
server.get("/api/posts", (req, res) => 
{
  db.find()
    .then(posts => {
      res
// (.status(200))
      .send(posts)
    })
    .catch(error => {
      res.status(500).json({errorMessage : "posts not found!"
    })
  })
})

 //GETBYID
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then(post => {
    if (post.length > 0) {
      res.send(post);
    } else {
        res.status(404)
            .json({errorMessage: "Not good, try again."})
      }
  })
  .catch(error => {
    res.status(500)
      .json({
        errorMessage: 'Not working'
      })
  })
})

 // POST


 // UPDATE


 // DELETE


 server.listen(PORT,() =>{
   console.log(`This works, kinda I think, check ${PORT}`)
 })