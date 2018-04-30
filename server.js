const express = require("express");
const bodyParser = require('body-parser');
const db = require('./data/db.js');

const server = express();
server.use(bodyParser.json());

// add your server code starting here
server.get('/', (req, res) => {
    res.send('Api running');
  });

server.get('/api/posts', (req, res) => {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});


server.get('/api/posts/:id', (req, res) => {
    const id = req.params.id;
    
    db
    .findById(id)
    .then(posts => {
        if (posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist."})
        } else {
            res.json(posts[0]);
        }
    })
    .catch(err => {
        res.status(500).json({ error: 'The posts information could not be retrieved.'})
    });
});


server.post('/api/posts', (req, res) => {
const {title, contents} = req.body;
const postNew = { title, contents}
    console.log(req);
    if (title.length === 0 || contents.length === 0) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    } else
    db
    .insert(postNew)
    .then(post => {
        res.status(201).json(post);
})
    .catch(err => {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    });
});


server.listen(5000, () => {
    console.log('server listening on port 5000');
  });