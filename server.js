// import your node modules
const bodyParser = require('body-parser');
const express = require('express');
const db = require('./data/db.js');
const fs = require('fs');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');

// add your server code starting here
const server = express();

const corsOptions = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204
};

server.use(cors(corsOptions));
server.use(bodyParser.json());
server.use(morgan('dev'));
server.use(helmet());

server.get('/api/posts', (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(error => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(response => {
        if(!response[0]) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
            return;
        }
        res.json(response[0]);
    }).catch(error => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

server.post('/api/posts/', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents;

    if(!title || !contents) {
        res.status(400).json({ error: 'Please provide title and contents for the post.' });
        return;
    }

    db
        .insert(req.body)
        .then(response => {
        
            db.findById(response.id)
                .then(post => {
                    res.status(201).json(post[0])
                })
                .catch(error => {
                    res.status(500).json({ error: "There was an error while saving the post to the database" })
                });

            })
        .catch(error => {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        });
})

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const title = req.body.title;
    const contents = req.body.contents;

    if(!title && !contents) {
        res.status(STATUS_USER_ERROR);
        res.json({ error: 'Please provide either a title or contents in order to update.' });
        return;
    }

    db
        .findById(id)
        .then(posts => {
            if(!posts.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                return;
            }
            db
                .update(id, req.body)
                .then(post => {
                    db
                        .findById(id)
                        .then(newPosts => {
                            res.status(200).json(newPosts[0]);
                        })
                        .catch(error => {
                            res.status(500).json({ error: "New post information could not be retrieved."})
                        })
                    })
                .catch(error => {
                    res.json({ error: "Post information could not be updated." });
                });

        }).catch(error => {
            res.status(500).json({ error: "Original post information could not be retrieved." });
        });
})


server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    
    db
        .findById(id)
        .then(posts => {
            if(!posts.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
                return;
            }
            db.remove(id).then(() => {
                res.json(id);
            }).catch(error => {
                res.json({ error: "The post could not be removed" });
            })
        })
        .catch(error => {
            res.status(500).json({ error: "The post could not be removed" })
        })
})


const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));