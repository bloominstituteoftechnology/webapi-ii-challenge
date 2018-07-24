// import your node modules
const express = require("express")
const db = require('./data/db.js');

// add your server code starting here

const server = express();
server.use(express.json());

//find posts
server.get('/api/posts', (requestAnimationFrame, res) => {
    db
    .find()
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(err => {
        res.status(500).json({ error: "The posts information could not be retrieved."});
    })
});


//findById
server.get('/api/posts/:id', (req, res) => {
    db
    .findById(req.params.id)
    .then(post => {
        if (post.length === 0) {
            res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." });
        }
        res
        .status(200)
        .json(post);
    })
    .catch(error => {
        res
        .status(500)
        .json({error: "The post information could not be retrieved."})
    })
});


//Post
server.post('/api/posts', (req, res) => {
    const {title, contents} = req.body;
    if (!title || !contents) {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
        return;
    }
    db
        .insert({
            title, contents
        })
        .then(response => {
            res.status(201).json(response);
        })
        .catch(error => {
            res.status(500).json({error: "There was an error while saving the post to the database" })
        })
});


//Delete
server.delete('/api/posts/:id', (req, res) => {
    const {id} = req.params;
    db
    .remove(id)
    .then(response => {
        if (response === 0) {
            res
            .status(404)
            .json({message: "The post with the specified ID does not exist."})
        }
        res
        .json({message:' User removed from system!'})
    })
        .catch(error => {
            res
            .status(500)
            .json({error: "The post could not be removed"})
        })
})


server.listen(8000, () => console.log("API running on port 8000"));