// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here
const server = express();

server.use(cors());
server.use(express.json());

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(pts => {
        res.json(pts);
    })
    .catch(err => {
        res.status(500).send({ error: "The posts information could not be retrieved." })
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db
    .findById(id)
    .then(pstidv => {
        res.json(pstidv);
    })
    .catch(err => {
        res.status(404).send({ message: "The post with the specified ID does not exist." })
    })
})

const port = 5000;
server.listen(port, () => console.log(`API running on port ${port}`));
