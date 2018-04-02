const express = require('express');
const server = express();
const bodyParser = require("body-parser");

server.use(bodyParser.json());

const db = require('./data/db.js');


server.get('/', (req, res) => {
    res.send({ api: 'Running...' })
});


server.post('/api/posts', (req, res) => {

  db
    .insert()
    .then(posts => {
      res.json(posts);
      res.status(201).json({ Created });
    })
    .catch(error => {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    });
    .update()
    .catch(error => {
    	res.status(500).json({ error: "The posts information could not be retrieved."});
    });
});


server.get('/api/posts', (req, res) => {

    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});


server.get('/api/posts/:id', (req, res) => {
    const{ id } = req.params;

    db
    .findById(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    })
    .find()
    .catch(error => {
    	res.status(500).json({ error: "The post information could not be retrieved." })
    });
});


server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
    .remove(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    })
    .cancel()
    .catch(error => {
        res.status(500).json({ error: "The post information could not be removed" });
 	.insert()   
    .catch(error => {
      res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    });
});


server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db
    .update(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    });
});


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));