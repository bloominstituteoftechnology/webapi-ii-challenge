// import your node modules
const express = require('express');
const server = express();
const db = require('./data/db.js');

server.use(express.json());
// add your server code starting here
server.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            console.error('error', err)
            res.status(500).json({errorMessage: 'Failed to retrieve data'})
        })
});

server.post("/api/posts", (req, res) => {
    const post = req.body;
    db.insert(post)
        .then(data => {
            if(!post || !post.title || !post.contents){
                res.status(400).json({errorMessage: "Please provide title and contents for the post."});
            }
            else{
                res.status(201).json(post);
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({error: 'There was an error while saving the post to the database.'})
        })
});

server.get("/api/posts/:id", (req, res) => {
   db.findById(req.params.id)
        .then(post => {
            if (post.length < 1){
                res.status(404).json({error: "The Post with the specified ID does not exist."})
            }
            else{
                res.status(200).json(post);
            }
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({error: "The posts information could not be retrieved."})
        })

});

server.delete("/api/posts/:id", (req, res) => {
    const {id} = req.params;
    db.remove(id)
        .then(count => {
            if (count > 0){
                res.status(200).json({message: `Post with ID ${id} has been deleted.`});
            } else {
                res.status(404).json({message: "The post with the specified ID does not exist."})
            }
        })
        .catch(err => {
            res.status(500).json({error: "The post could not be removed."});
        })
});

server.put("/api/posts/:id", (req, res) => {
    const {contents, title} = req.body;
    const {id} = req.params;
    if(!req.body || !contents || !title){
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    } else{
        db.update(id, req.body)
            .then(post => { 
                    res.status(200).json({message: "Post updated."});
                })
            .catch(err => {
                res.status(500).json({error: "The post information could not be modified."});
            })
    }
});

server.listen(8000, () => console.log("===The server is running on port 8000==="));