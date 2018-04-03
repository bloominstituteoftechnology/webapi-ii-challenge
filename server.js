// import your node modules
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');


const db = require('./data/db.js');

const server = express();

// middleware
server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

// add your server code starting here
server.get('/', (req, res)=>{
    res.json({ api: 'Running...' });
});

server.get('/api/posts', (req, res) => {
    
    db
        .find()
        .then(posts=> {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })
    server.get('/api/posts/:id', (req, res)=>{
        const{ id } = req.params;
        db
            .findById(id)
            .then(posts => {
                res.json(posts[0]);
            })
            .catch(error => {
                res.status(500).json(error);
            })
    })
    server.delete('/api/posts/:id', (req, res) => {
        const { id } = req.params;
        let post;

        db
        .findById(id)
        .then(response => {
            post = {...response[0] };
    
        db
        .remove(id)
        .then(response => {
            res.status(500).json(response);
        })
    })
        .catch(error => {
            res.status(500).json({
                message: "The post could not be removed" })
        });
    });

    server.post('/api/posts', (req, res) => {
        const post = req.body;
        db
            .insert(post)
            .then(response => {
                res.status(201).json(response);
            })
            .catch(error => {
                res.status(500).json
                ({ error: 'There was an error while saving the post to the database.' })
            })
    })

    

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;

    db
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db.findById(id).then(updatePosts => {
                    res.status(200).json(updatePosts[0]);
                })
            } else {
                res.status(400).json({ message: 'The post with the specified ID does not exist.' })
            }
        })
        .catch(error => {
            res.status(500).json(error);
        })
    })

    

const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));