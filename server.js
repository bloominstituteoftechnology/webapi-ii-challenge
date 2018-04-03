const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());


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
            res.status(500).json({ error: "There was an error while saving the post to the database" });
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
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});


server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    
    db
        .findById(id)
        .then(posts => {
            if(posts.length === 0) {
            res.status(404).json({ message: "The post with the specified ID does not exist" })
        }
        else {
            res.json(posts);
        }
    })
        .catch(error => {
            res.status(500).json({ error: "The post with the specified ID does not exist." });
    })
});



const port = 5000;
server.listen(port, () => console.log('API Running on port 5000'));
