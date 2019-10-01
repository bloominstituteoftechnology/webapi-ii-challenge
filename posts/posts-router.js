const express = require('express');
const postsModel = require('../data/db.js');

const router = express.Router()
    
    router.get('/', (req, res)=>{
        postsModel
        .find()
        .then(posts => {
            res.json(posts);
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "The posts information could not be retrieved."});
        });
    });
    
    router.get('/:id', (req, res)=>{
    const id = req.params.id;
    
        postsModel
        .findById(id)
        .then(posts => {
            if (!posts) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            else{res.json(posts)}
        })
        .catch(error => {
            res.status(500).json({ errorMessage: "The posts information could not be retrieved." });
        });
    });
    
    router.post('/', (req, res)=>{ // this woudn't work without server.use(express.json()) above.
        const postData = req.body;
    
        console.log('post data', postData);
    
        //Validate around here
        if (!postData.name || !postData.bio) {
            res.status(400).json({ errorMessage: "Please provide name and bio for the post." });
        } else {
        postsModel
        .insert(postData)
        .then(post =>{
            res.status(201).json(post);
        })
        .catch(error => {
            res.status(500).json({ message: 'There was an error while saving the post to the database' });
        })
    }
    })
    
    router.delete('/:id', (req, res)=>{
    const id = req.params.id;
    
    
    postsModel
    .remove(id)
    .then(posts => {
        if (!posts) {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
        else{res.status(200).json(posts)}
    })
    .catch(error => {
        res.status(500).json({ message: 'The post could not be removed.' });
    })
    })
    
    router.put('/:id', (req, res)=>{
        const id= req.params.id;
        const changes = req.body;
    
        postsModel
        .update(id, changes)
        .then(posts => {
            if (!posts) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            else{res.status(200).json(posts)}
        })
        .catch(error => {
            res.json({ message: 'The post information could not be modified.' });
        })
    })
    

    module.exports = router;