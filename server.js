const express = require('express');

const bodyParser = require('body-parser');

const db = require('./data/db.js');

const server = express();

server.use(bodyParser.json());


server.post('/api/posts', (req, res) => {
    const body = req.body ? req.body : {}
   
    const { title, contents } = body

    if(!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        return;
    }

    const newPost = {
        title,
        contents,
    }

    db
        .insert(newPost)
        .then(id => {
            const post = {...newPost, id}
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({error: "The post information could not be modified."});
        });
    //res.json({ a: 1});
});

server.get('/api/posts', (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({error: "The posts information could not be retrieved."});
        });
});


server.get('/api/posts/:id', (req, res) => {
    console.log();
    const { id } = req.params;
    
    db
        .findById(id)
        .then(posts => {
            res.json(posts[0]);
        })
        .catch(error => {
            res.status(500).json(error);
        });
    res.json({ a: 1});
});



const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
