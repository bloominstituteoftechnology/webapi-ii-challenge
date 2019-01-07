// import your node modules
const express = require('express');

const db = require('./data/db.js');

const server = express();
// add your server code starting here
server.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => res.json(err));
})



server.listen(5000, () => console.log('server running'));