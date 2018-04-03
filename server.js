// import your node modules
const express = require('express');
const db = require('./data/db.js');

const server = express();
const bodyParser = require('body-parser');
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// add your server code starting here
server.get('/api/posts', (req, res) =>{
    db
    .find()
    .then(posts =>{
        res.json(posts)
    })
    .catch(error =>{
        res.status(500).json({ error: "The posts information could not be retrieved." });
    });
});


server.get('/api/posts/:id', (req, res) =>{
    const { id } = req.params;
    db
    .findById(id)
    .then(post =>{
        if(post.length){
            res
                .status(200)
                .json(post[0]);
        }else{
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." });

        }
    })
    .catch(error =>{
        res.status(500).json({error: "The post information could not be retrieved."});
    });
});


server.post(`/api/posts`, (req, res) => {
    //const body =  req.body !== undefined ? req.body : {};
    const {title, contents } = req.body;
    // check if title and contents are set
    if(title === undefined || contents === undefined){
        //console.log(title, contents);
        res 
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
            return;
    }
    // create new post object
    const newPost = {title, contents};
    console.log(newPost)
    //insert it in the database
    db
        .insert(newPost)
        .then(response => {
            const post = {...response, title, contents}
            res
            .status(201)
            .json(post);
        }).catch(err => {
            res
                .status(500)
                .json({error: "There was an error while saving the post to the database"});
        });
});



server.put(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    // find
    db
        .findById(id)
        .then(post => {
            // continue
        })
        .catch(err => {
            res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." })
                return;
        })
    // if you reach here
    const body =  req.body !== undefined ? req.body : {};
    const {title, contents } = body;
    const updatedPost = {title, contents};
    // check if title and content are set
    if(title === undefined || contents === undefined){
        res 
            .status(400)
            .json({ errorMessage: "Please provide title and contents for the post." })
            return;
    }
    if(updatedPost !== undefined){
        db
            .update(id, updatedPost)
            .then(response => {
                res 
                    .status(200)
                    .json({...updatedPost, id});
                    return;
            })
            .catch(error => {
                res 
                    .status(500)
                    .json({ error: "The post information could not be modified." });
                return;
            })
            return;
    }
    res
        .status(500)
        .json({error: "Post was not updated"})
        return;
});


server.delete(`/api/posts/:id`, (req, res) => {
    const { id } = req.params;
    db
        .findById(id)
        .then(post => {
            if(post.length){
                db
                .remove(id)
                .then(() => {
                    res
                    .json({message: `post with id no. ${id} removed successfully`});
                })
            } else {
                res
                .status(404)
                .json({ message: "The post with the specified ID does not exist." });
                }       
        })
        .catch(err => {
            res
            .status(500)
            .json({ message: "could not delete the post" })
        });
});


const port = 5000;
server.listen(port, () =>{
    console.log(`Server running on port ${port}`);
})