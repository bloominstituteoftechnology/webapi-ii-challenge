// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();

const bodyParser = require('body-parser');
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// add your server code starting here
server.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');

    res.setHeader('Access-Control-Allow-Methods', 'GET');

    next();
});


server.get('/', (req, res) => {
    res.json({api: 'Running' })
});

server.get('/api/posts', (req, res) => {
    console.log('get request made');
    db
    .find()
    .then(posts => {
        res.json(posts);
    })
    .catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    })
});    

server.get('/api/posts/:id', (req, res) => {
        const { id } = req.params;
        
        db
        .findById(id)
        .then(post => {
            res.json(...post);
        })
        .catch(error => { 
            res.status(500).json(error);
        })
});
    

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if (post.title && post.contents) {
        db
        .insert(req.body)
        .then(id => {
            res.status(201).json(post);
        })
        .catch(error => {
            res.json(error);
        })
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    
});

server.delete('/api/posts/:id', (req, res) => {
    db
    .remove(req.params.id)
    .then(response => {
        if (response === 0){
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(error => {
        res.status(500).json({ error: "The post could not be removed" });
    })
});

server.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    const { title, contents } = req.body;

    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.update(req.params.id, post)
        .then(response => {
            if(response === 0) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post);
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The post information could not be modified." });
        })
    };
});

const port = 5000;
server.listen(port, () => console.log('API running on port 5000'));


