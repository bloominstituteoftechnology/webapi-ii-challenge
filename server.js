// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();

server.use(cors());

const port = 8000;

server.get('/', (req, res)=> {
    res.send('Hello :)');
});

server.get('/api/posts', (req, res)=> {
    db.find()
        .then(posts=> {
            console.log(posts);
            res.json(posts);
        })
        .catch(err=> {
            res.send(err);
        })
});

server.get('/api/posts/:id', (req, res)=> {
   db.findById(req.params.id)
    .then(post=> {
        if (post) {
            res.status(200).json({post})
        } else {
            res.status(404).json('Post not found');
        }
    })
    .catch(err=> {
        res.send(err)
    });
});

server.listen(port, ()=> {
    console.log(`API running on port ${port}`);
});