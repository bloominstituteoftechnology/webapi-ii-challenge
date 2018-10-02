//Import your node modules
const express = require('express');
const cors = require('cors');
const db = require('./data/db.js');

//Add your server code starting here
const server = express();

//Need for some reason? 
server.use(cors());
server.use(express.json());

//GET
server.get('/api/posts', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => res.send(err))
})

//POST
server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body;
    const newPost = {title, contents};
    db.insert(newPost)
        .then(postId => {
            const{id} = postId;
            db.findById(id)
                .then(post => {
                    if(!post) {
                        return res.status(422).send({Error: `Post does not exist by id: ${id}`})
                    }
                    res.status(201).json(post);
                })
        })
        .catch(err => console.log(err))
})

//DELETE
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(removedPost => {
            res.status(200).json(removedPost);
        })
        .catch(err => console.error(err))
})

//PUT
server.put('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    const {title, contents} = req.body;
    const updatedPost = {title, contents};
    db.update(id, updatedPost)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(err => console.error(err));
})


const port = 8100; 
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} ===`));