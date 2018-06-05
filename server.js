// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

const port = 5000;
const server = express();
server.use(express.json());
server.use(cors());

// add your server code starting here
server.get('/', (req, res) => {
    res.send('Test Test :)');
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    db
        .insert({ title, contents })
        .then(response => {
            res.json(response);
        })
        .catch(error => {
            res.json({ error: "The posts information could not be retrieved." })
        })
})

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json({ posts });
        })
        .catch(error => {
            res.json({ errorMessage: "Please provide title and contents for the post." })
        })
})

server.delete('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    db
        .remove(id)
        .then(posts => {
            res.json({ posts })
        })
        .catch({ message: "The post with the specified ID does not exist." })
})

server.put('/api/posts/:id', (req, res) => {
    const { title, contents } = req.body;
    const id = req.params.id;
    db
        .update(id, { title, contents })
        .then(count => {
            res.json({ count })
        })
        .catch(error => {
            res.json({ message: "The post with the specified ID does not exist." })
        })

})

server.listen(port, () => console.log(`Server is running on port ${port}`));