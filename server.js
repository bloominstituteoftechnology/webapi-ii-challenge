// import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

// add your server code starting here
const port = 5000;
const server = express();
server.use(express.json());
server.use(cors({ origin: 'http://localhost:3000' }));


// Server GET request
server.get('/', (req, res) => {
    res.send('We are in the root!');
})

server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(error => {
            console.error('error', error);

            res.status(500).json({
                message: 'The posts information could not be retrieved!'
            })
        })
})

// Server GET BY ID request
server.get('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.findById(req.params.id)
        .then(posts => {
            if(posts.length > 0) {
                res.json({posts})
            } else {
                res.status(404);
                res.json({
                    message: 'The post with the specified ID does not exist!'
                })
            }
        })
        .catch(error => {
            res.status(500);
            res.json({
                error: 'The post information could not be retrieved!'
            })
        })
})


// Server POST request
server.post('api/posts', (req, res) => {
    if(!req.body.title || !req.body.contents) {
        res.status(400);
        res.json({
            message: 'Please provide title and contents for the post!'
        });
    } else {
        const {title, contents} = req.body;
        db.insert({title, contents})
            .then (res => {
                res.status(201);
                db.findById(res.id)
                    .then(posts => {
                        res.json({posts});
                    });
            })
            .catch(error => {
                res.status(500);
                res.json({
                    error: 'There was an error while saving the post to the database!'
                })
            })
    }
})

//Server DELETE request
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(success => {
            if(success) {
                res.status(200);
                res.json({success});
            } else {
                res.status(404);
                res.json({
                    message: 'The post with the specified ID does not exist!'
                })
            }
        })
        .catch(error => {
            res.status(500);
            res.json({
                error: 'The post could not be removed!'
            });
        })
})

// Server PUT request
server.put('/api/posts/:id', (req, res) => {
    const {title, contents} = req.body;
    const id = req.params.id;
    if (!title || !contents) {
        res.status(400);
        res.json({
            message: 'Please provide title and contents for the post!'
        });
    } else {
        db.update(id, {title, contents})
            .then(success => {
                if(success) {
                    res.status(200);
                    db.findById(id)
                        .then(posts => {
                            res.json({posts});
                        });
                } else {
                    res.status(404);
                    res.json({
                        message: 'The post with the specified ID does not exist!'
                    });
                }
            })
    .catch(error => {
        res.status(500);
        res.json({
            error: 'The post information could not be modified!'
        });
    })
    }
})


// Server listen on port 5000
server.listen(port, () => 
    console.log(`\n==listening API at ${port} port ==\n`)
);