// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// add your server code starting here

server.get('/', function(req, res) {
    db
    .find()
    .then(users => {
        res.json(users) 
    })
    .catch(error =>{
        res.status(500).json({error: "The posts information could not be retrieved."})
    })
})

const port = 5000;
server.listen(port, () => console.log('Api running on port 5000'));