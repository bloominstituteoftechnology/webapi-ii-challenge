// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.json({posts});
        })
        .catch(err => {
            res.json(err);
        });
});


server.listen(5000, () => console.log('server running'));