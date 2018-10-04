// import your node modules
const express = require('express');
const cors = require('cors');

const db = require('./data/db.js');

// add your server code starting here

const server = express();

server.use(cors());

server.use(express.json());

server.get('/api/posts', (request, response) => {
    db.find()
    .then(posts => {
        response.json(posts);
    })
    .catch(err => {
        res .status(500)
            .json({ error: `The posts information could not be retrieved.` });
    });
});

server.get('/api/posts/:id', (request, response) => {   
    const id = request.params.id;
    db  .findById(id)
        .then(post => {
            if (!post) {
                return res .status(404)
                           .send({ 
                               message: `The post with the specified ID does not exist.`
                            });        
            }
            response.json(post[0]);
        })
    .catch(err => {
        res .status(500)
            .json({ 
                error: `The post information could not be retrieved.`
            });
    });
});

server.post('/api/posts', (req, res) => {
    const { title, contents } = req.body;
    const newPost = { title, contents };
    if (!title || !contents || title === "" || contents === ""){
        res .status(400)
            .json({ errorMessage: `Please provide title and contents for the user.` })
    } else{ 
        db  .insert(newPost)
            .then(postId => {
                const { id } = postId;
                db  .findById(id)
                    .then(post => {
                        res .status(201)
                            .json(post);
                    });
            })
            .catch(err => {
                res .status(500)
                    .json({ error: `There was an error while saving the post to the database.`})
            });       
    }
  });

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
        .then(removedUser => {
            if (!removedUser) {
                return res .status(404)
                           .send({ 
                               message: `The post with the specified ID does not exist.`
                            });        
            }
            res.status(200).json(removedUser);
        })
        .catch(err => {
            res .status(500)
                .json({ error: `The post could not be removed`})
        });       
});

server.put('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    const { title, contents } = req.body;
    const newPost = { title, contents };
    if (!title || !contents || title === "" || contents === ""){
        return res  .status(400)
                    .json({ 
                        errorMessage: `Please provide title and contents for the post.` })
    } else{ 
        db.update(id, newPost)
        .then(post => {
            if (!post) {
                return res  .status(404)
                            .send({ 
                                message: `The post with the specified ID does not exist.`
                            });        
            }
            res .status(200).json(post);
        })
        .catch(err => {
                res .status(500)
                    .json({ error: `The post information could not be modified.`})
        });   
    }    
});

const port = 8000;
server.listen(port, () => 
    console.log(`\n=== API running on port ${port} === \n`));