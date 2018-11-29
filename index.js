// import your node modules
const express = require("express");
const bodyParser = require("body-parser");
const server = express();
const PORT = 4000;

const db = require('./data/db.js');

// add your server code starting here

server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());

server.get("/api/posts", (req, res) => {
    db.find().then(posts => {
        res.json(posts);
    }).catch(error => {
        res.status(500).json({error: "The posts information could not be retrieved."});
    });
});

server.post("/api/posts", (req, res) => {
    let newPost = {
        title: req.body.title,
        contents: req.body.contents
    };

    if (newPost.title && newPost.contents) {
        db.insert(newPost).then(post => {
            res.status(201).send(post);
        }).catch(error => {
            res.status(500).json({error: "There was an error while saving the post to the database"});
        });
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."})
    }

});

server.get("/api/posts/:id", (req, res) => {
    let id = req.params.id;
    db.findById(id).then(post => {
        res.json(post);
    }).catch(error => {
        res.status(404).json({message: "The post with the specified ID does not exist."});
    });
});

server.put("/api/posts/:id", (req, res) => {
    let id = req.params.id;
    let update = req.body;

    if (update.title && update.contents) {
        db.update(id, update).then(post => {
            res.status(200).json(post);
        }).catch(error => {
            res.status(500).json({error: "The post information could not be modified."});
        });
    } else {
        res.status(400).json({errorMessage: "Please provide title and contents for the post."});
    }
});

server.delete("/api/posts/:id", (req, res) => {
    let id = req.params.id;
    db.remove(id).then(() => {
        res.status(200);
    }).catch(error => {
        res.status(500).json({error: "The post could not be removed"});
    });
});

server.listen(PORT, function() {
    console.log(`API server listening on port: ${PORT}`);
});