// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

const server = express();


// add your server code starting here
server.use(cors());

server.get('/', (req,res) => {
    res.send('<h1>Michael Hacker - Node Express Lab Assignment</h1>');
});

server.get('/api/posts', (req, res) => {
    db.find()
    .then(posts => {
        console.log('\n** posts **', posts);
        res.status(200).json(posts);
    })
    .catch(err => res.send(err));
})

server.get('/api/posts/:id', (req, res) => {
    db.findById(id)
})

const port = 8000;
server.listen(port, () => console.log(`API running on port ${port}`));