// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();
// const bodyParser = require('body-parser');
const morgan = require('morgan');
const helmet = require('helmet');

// middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

server.get('/', function(req, res) {
    res.send({ api: 'Running...' });
});

// server.post('/api/posts', function(req, res) {
//     db
//     .insert()
//     .then(posts => {
//         res.json(posts);
//     })
//     .catch(error => {
//         res.status(500).json(error);
//     });
// });

//new post
server.post('/api/posts', function(req, res) {
    const post = req.body;
    db
    .insert(post)
    .then(response => {
        res.status(201).json(response);
    })
    .catch(error => {
        res.status(400).json({ errorMessage: "Please provid title and content for the post" });
    });
});

server.get('/api/posts', function(req, res) {
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.send(404).json({ error: 'The posts information could not be retrieved.' });
    });
});

server.get('/api/posts/:id', (req, res) => {

    const { id } = req.params;
        
    db
    .findById(id)
    .then(posts => {
        res.json(posts[0]);
    })
    .catch(error => {
        res.send(404).send({ message: 'The post with the specified ID does not exist.' });
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
        res.status(500).json({ error: 'The post could not be removed' });
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
        res.status(500).json(error);
    });
});




const port = 5500;
server.listen(port, () => console.log('API Running on port 5500'));