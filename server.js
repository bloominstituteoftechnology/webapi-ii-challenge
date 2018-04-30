const express = require('express');
const db = require('./data/db');

const server = express();

// add your server code starting here
server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts)
    }).catch(error => {
        console.log(error);
    })

});

server.listen(5000,() => console.log(`API Running on port 5000`));