// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();

// middleware - put when doing react app
server.use(cors());

// starting point
server.get('/', (req, res) => {
    res.send('Home');
})
// request handlers.
// GET
server.get('/api/posts', (req, res) => {
    db.find().then(users => {
        console.log('\n** users **', users);
        res.status(200).json(users);
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved."}));
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(user => {
        res.json(user);
    })
    .catch(err => res.status(404).json({ message: "The post with the specified ID does not exist." }));
})


const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`))

