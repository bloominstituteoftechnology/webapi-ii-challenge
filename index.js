// import your node modules
const express = require('express');
const db = require('./data/db.js');

// add your server code starting here
const server = express();

// middleware - put when doing react app

// starting point
server.get('/', (Req, res) => {
    res.send('Test');
})
// request handlers.
server.get('/api/users', (req, res) => {
    db.find().then(users => {
        console.log('\n** users **', users);
        res.json(users);
    })
    .catch(err => res.send(err))
})

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`))