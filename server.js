const bodyParser = require('body-parser');
const express = require('express');

const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json())

server.get('/', (req, res) => {
    res.send({api: 'RUNNING!'});
})

server.get('/api/posts', (req, res) => {
    db.find()
    .then(users => res.json(users))
    .catch(error => res.status(500).json({ error: "The posts information could not be retrieved." }));
})


server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
    .then(posts => res.json(posts[0]))
    .catch(error => res.status(500).json(error));
})

server.post('/api/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if (!(title && contents)) {
        res.status(400);
        res.json({ errorMessage: "Please provide title and contents for the post." });
        return;
    }

    else {
    db.insert({ title, contents })
    .then(id => res.status(200).json({ title, contents, id: id.id}))
    .catch(error => res.status(500).json({ error: "There was an error while saving the post to the database" }));
    }
})

server.post('/api/posts', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;
    if (!(title && contents)) {
        res.status(400);
        res.json({errorMessage: "Please provide title and contents for the post." });
        return;
    }
    else {
    db.insert({ title, contents })
    .then(id => res.status(200).json({ title, contents, id: id.id}))
    .catch(error => res.status(500).json(error));
    }
})


const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));