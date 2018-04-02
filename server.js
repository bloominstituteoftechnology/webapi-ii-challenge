const express = require('express');

const bodyParser = require('body-parser');


const db = require('./data/db.js');

const server = express();

server.get('/', (req, res) => {
    res.json('Server up and running....')
})

server.get('/api/posts', (req, res) => {
    db
        .find() 
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.abort(posts);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
}) 

server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;

    db
        .findById(id)
        .then(posts => {
            res.json(posts[0]);
        })
        .catch(error => {
            if (res.status(404)) {
                res.abort(posts[0]);
                res.json({ error: "The post with the specified ID does not exist." })
            } else if (res.status(500)) {
                res.json({ message: "The post information could not be retrieved."})
            }
        })
})

server.post('/api/posts', (req, res) => {

})

const port = 5000;
server.listen(port, () => console.log("Server up and running"));
