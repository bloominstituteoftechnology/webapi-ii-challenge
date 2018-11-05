// import your node modules
const express = require('express')
const cors = require('cors')
const server = express();

server.use(cors());

server.listen(5050, ()=> console.log('the server is up!'))
const db = require('./data/db.js');


server.get('/api/posts',(req,res)=>{
    db.find().then((value)=>{ res.status(200).send(value)})
             .catch(error => { res.status(500).send({ error: "The posts information could not be retrieved." })})   
})

server.get('/api/posts/:id',(req,res)=>{
    db.findById(req.params.id)
      .then((value)=>{ res.status(200).send(value)})
      .catch(error => { res.status(404).send({ message: "The post with the specified ID does not exist." })})   
})



