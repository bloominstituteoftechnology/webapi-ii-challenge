// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();
const port = 7000;

server.listen(port, () => {console.log(`Server running on port ${port}`)});

server.get('/api/users', (req, res) => {
    db.find()
    .then(users => {
        console.log('users: ', users);
        res.json(users);
    })
    .catch(err => res.send(err));
});