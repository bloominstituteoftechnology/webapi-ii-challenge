// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();

server.use(express.json());

server.use(cors());

const port = 8000;

server.get('/', (req, res)=> {
    res.send('Hello :)');
});

server.get('/api/posts', (req, res)=> {
    db.find()
        .then(posts=> {
            console.log(posts);
            res.status(200).json(posts);
        })
        .catch(err=> {
            res.status(500).json({error: "The post information could not be retrieved." });
        })
});

server.get('/api/posts/:id', (req, res)=> {
   db.findById(req.params)
    .then(post=> {
        if (post) {
            res.status(200).json({post})
        } else {
            res.status(404).json('Post not found');
        }
    })
    .catch(err=> {
        res.status(500).json({error: "The post information could not be retrieved."});
    });
});

server.post('/api/posts', (req, res)=> {
    const {title, contents} = req.body;
    const newPost = {title, contents};
    db.insert(newPost)
        .then(postId=> {
            const {id} = postId;
            db.findById(id)
                .then(post=> {
                    if (!req.body.title || !req.body.contents) {
                        res.status(400)
                            .json({errorMessage: "Please provide title and contents for the post." })
                    } 
                     res.status(201).json(post);
                });
        })
        .catch(err=> {
            res.status(500).json({error: "There was an error while saving the post to the database"});
        })
});

server.put('/api/posts/:id', (req, res)=> {
    const {id} = req.params;
    const {title, contents} = req.body;
    const updatedPost = {title, contents};
    db.update(id, updatedPost)
        .then(post=> {
           if (!post) {
               res.status(404).json({message: "The post with the specified ID does not exist."});
           } else if (!req.body) {
               res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
           } else {
               res.status(200).json(post);
           }
        })
        .catch(err=> {
            res.status(500).json({ error: "The post information could not be modified."});
        })
});

server.delete('/api/posts/:id', (req, res)=> {
    const {id} = req.params;
    db.remove(id)
        .then(post=> {
            if (!post) {
                res.status(404).json({message: "The post with the specified ID does not exist."});
            }
            res.status(200).json(post);
        })
        .catch(err=> {
            res.status(500).json({error: "The post could not be removed"});
        })
});

server.listen(port, ()=> {
    console.log(`API running on port ${port}`);
});