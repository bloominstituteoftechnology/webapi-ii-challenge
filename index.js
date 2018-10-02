// import your node modules
const express = require('express');

const db = require('./data/db.js');

// add your server code starting here
// adding a comment so I can commit changes for daily form

const server = express();

server.listen(9000, () => {console.log('API is running.')});

server.get('/api/posts', (request, response) => {
    db
        .find()
        .then((posts) => response.json(posts) )
        .catch(err => response.send(err))
})