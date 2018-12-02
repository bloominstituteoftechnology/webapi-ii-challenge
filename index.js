// import your node modules

const db = require('./data/db.js');
const express = require('express');
const server = express();

server.use(express.json()); //Middleware; Parse's body for Post request
// server.use() calls the middleware, express.json() is the middleware.

// add your server code starting here

server.get('/api/posts', (req, res) => {
    db.find()
        .then((posts) => {
            res.json(posts)
        })
        .catch(err => {
            res.status(500)
                .json({error: 'The posts information could not be retrieved.'})
        })
});

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(post => {
            if(post) {
                res.json(post);
            } else {
                res
                    .status(404)
                    .json({message: 'The post with the specified ID does not exist'});
            }
        })
        .catch(err => {
            res
                .status(500)
                .json({message: 'The post information could not be retrieved'});
        })
})

server.post('/api/posts', (req, res) => {
    const post = req.body;
    if(post.title && post.content){
        db.insert(post)
            .then((postInfo) => {
                db.findById(postInfo.id)
                    .then(post => {
                    res.status(201)
                        .json(post)
                });
            })
            .catch(err => {
                res
                    .status(500)
                    .json({message: 'Failed to insert user in DB'});
            });
    } else {
        res
            .status(400)
            .json({message: "Please provide title and contents for the post"})
    }
});

server.delete('/api/posts/:id', (req, res) => {
    const { id } = req.params;
    
    db.remove(id)
        .then(count => {
            if(count){
                res.json({message: 'post was successfully deleted'})
            } else {
                res.json({message: 'The post with the specified ID does not exist'})
            }
        })
        .catch( err => {
            res 
                .status(500)
                .json({message: 'The post could not be removed'})
        })
})

server.put('/api/posts/:id', (req, res) => {
    const post = req.body;
    const { id } = req.params;    
    if(post.title && post.content){ // Verifying that the req info is valid
        console.log("Updated info ", post, "ID ", id) 
        db.update(id, post)
            .then(updatedPost => {
                console.log('updated post from Update Method', updatedPost)
                if(updatedPost){
                    db.findById(id)
                        .then(post => {
                            res.json(post)
                        })
                    } else {
                        res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist" })
                }                
            })
            .catch( err => {
                console.log("Post in the catch", post, "Id", id)
                res
                    .status(500)
                    .json({message: 'The post information could not be modified'})
            })
    } else {
        res 
            .status(400)
            .json({message: 'Please provide title and contents  for the post'})
    }
})



  

server.listen(4000);