// import your node modules

const db = require('./data/db.js');
const express = require('express'); 

// add your server code starting here

const server = express(); 

server.get('/api/posts', (req,res) => {
    db.find().then(posts => {
        res.status(200).json(posts)
    }).catch( err => {
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

server.listen('3000'); 