// import your node modules
const express = require('express');
const helmet = require ('helmet');
const server = express();
const port = 8000;
const db = require('./data/db.js');

server.use(helmet());
server.use(express.json());

// add your server code starting here
server.listen(port, () => console.log(`Server is listening on port ${port}`))

server.get('/api/posts', (req, res) => {
    db.find().then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
})
server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db.findById(id).then(p => {
        res.status(200).json(p)
    })
    .catch(err => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})
