// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();
const PORT = 4000;

server.get('/api/posts', (req, res) =>{
    db.find()
        .then(post =>{
            res.json(post)
        })
        .catch(err =>{
            res.status(500).json({error: 'Could not get post data'})
        })
})
server.get('api/posts/:id', (req, res) =>{
   
})
server.listen(PORT, () =>{
    console.log('The server is working!');
})
// add your server code starting here
