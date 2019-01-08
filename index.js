// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(cors());
server.use(express.json());

server.get('/api/posts', (req,res) => {
    db.find().then(posts => {
        res.status(200).json({posts})
    }).catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
})

server.get('/api/posts/:postid', (req,res) => {
    const id = req.params.postid;

    db.findById(id)
    .then(post => {
        if(post.length){
            res.status(200).json(post);
        }
        else{
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        }
    })
    .catch(err => res.status(500).json({ error: "The post information could not be retrieved." }))
})

server.post('/api/posts', (req,res) => {
    const userInfo = req.body;

    if( userInfo.title && userInfo.contents ){
        db.insert(userInfo)
            .then(result => {
                db.findById(result.id)
                    .then(user => {
                        res.status(201).json(user);
                    })
                    .catch(err => res.status(500).json({message: 'user added, but get by id failed', error: err}))
            })
            .catch(err=> res.status(500).json({message: 'post of new user failed', error: err}))
    }
    else{
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }
})

server.delete('/api/posts/:id', (req,res) => {
    const id = req.params.id;

    db.findById(id)
        .then(post => {
            if(post){
                db.remove(id)
                .then( () => { res.status(200).json({message: 'post deleted', deletedItem: post})})
            }
            else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => res.status(500).json({ error: "The post could not be removed" }))
})

server.put('/api/posts/:id', (req,res) => {
    const id = req.params.id;
    const changes = req.body;

    db.findById(id)
        .then(post => {
            if( post ) {
                if( changes.title && changes.contents){
                    db.update(id, changes)
                    .then(count => {
                        db.findById(id).then(updatedPost => res.status(200).json(updatedPost))
                    })
                }
                else{
                    res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
                }
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(500).json({ error: "The post information could not be modified." }))
})

server.listen(5000, () => console.log('server running'));