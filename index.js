// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

// middleware - put when doing react app

// starting point
server.get('/', (req, res) => {
    res.send('Home');
})
// request handlers.
// GET
server.get('/api/users', (req, res) => {
    db.find().then(users => {
        console.log('\n** users **', users);
        res.status(200).json(users);
    })
    .catch(err => res.send(err));
    res.status(500).json({ error: "The post information could not be retrieved."});
})

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`))

