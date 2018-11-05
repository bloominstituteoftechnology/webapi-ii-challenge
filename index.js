// import your node modules
const express=require('express');

const db = require('./data/db.js');

// add your server code starting here
//creat server
const server=express();

//GET request for /api/posts
server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts =>{
        res.status(200)
        .json(posts);
    })
    .catch(err => {
        res.status(500)
        .json({err: "The posts information could not be retrieved."})
    })
})

server.listen(5000, ()=>console.log('Server is listening on port 5000'));