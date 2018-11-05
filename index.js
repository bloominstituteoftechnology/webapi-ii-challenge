// import your node modules
const express = require('express')
const server = express();
server.listen(5000, ()=> console.log('the server is up!'))
const db = require('./data/db.js');


server.get('/api/posts',(req,res)=>{
    db.find().then((value)=>{ res.status(200).send(value)})
})


// add your server code starting here
