// import your node modules
const express = require('express')
const server = express();
server.listen(5000, ()=> console.log('the server is up!'))
const db = require('./data/db.js');


server.get('/api/posts',(req,res)=>{
    db.find().then((value)=>{ res.status(200).json(value)})
             .catch(error => { res.status(500).json({ error: "The posts information could not be retrieved." })})   
})

server.get('/api/posts/:id',(req,res)=>{
    db.findById(req.params.id)
      .then((value)=>{ res.status(200).json(value)})
      .catch(error => { res.status(404).json({ message: "The post with the specified ID does not exist." })})   
})



// add your server code starting here
