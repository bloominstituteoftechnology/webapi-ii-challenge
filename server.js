// IMPORTS

const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');

const db = require('./data/db.js');

const server = express();

//MIDDLEWARE

server.use(morgan('dev'));
server.use(helmet());
server.use(express.json());

// POST REQUEST 

server.post(`/api/posts`, (req, res) => {
    // const Body = req.body ? req.body : {};
    // const { title, contents } = Body;
    const post = req.body
    const { title, contents } = post
    // console.log('title', title, 'contents' ,contents);

    if (!title || !contents) {
        res
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." });
            return;
    }
   
    db
        .insert(post)
        .then(id => {
            res
                .status(201)
                .json(post);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
                return;   
        });
        
        //HACKY SOLUTION BELOW
    // const newPost = {
    //     title,
    //     contents,
    // };
    
    // db
    // .insert(newPost)
    // .then(id => {
    //     const post = { ...newPost, id };
    //     res.status(201).json(post);
    // })
    // .catch(err => {
    //     res.status(500).json({ error: "The posts information could not be retrieved."});
    // });
});

//GET REQUEST 

server.get(`/api/posts`, (req, res) => {
    db
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
                return;   
        });
});

server.get(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;

    db
        .findById(id)
        .then(post => {
            if (post.length) {
                res
                    .status(200)
                    .json(post[0]);
            }
            else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." });
                    return;   
           }
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
                return;   
        });
});

// DELETE REQUEST 

server.delete(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    let post;
    // console.log(id) //expect 3 
    
    db
        .findById(id)
        .then(response => {
            post = { ...response[0] }
        if (post.id) {
            db
                .remove(id)
                .then(response => {
                    res 
                        .status(200)
                        .json(post)
                })
                .catch(error => {
                    res
                        .status(500)
                        .json({ error: "The posts information could not be retrieved." });
                        return;
                });     
        } else {
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." });
                return;   
        }
    })
    .catch(error => {
        res
            .status(500)
            .json({ error: "The posts information could not be retrieved." });
            return;
    });
});

//PULL REQUEST

server.put(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    const update = req.body;
    
    db  
        .update(id, update)
        .then(count => {
            if (count > 0) {
                db
                    .findById(id)
                    .then(updatedPost => {
                        res 
                            .status(200)
                            .json(updatedPost[0]);
                    })
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." })
                    return;
            }
            
        })
        .catch(error => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." });
                return;
        });     
})

const port = 5000;

server.listen(port, () => console.log('API Running on port 5000'))