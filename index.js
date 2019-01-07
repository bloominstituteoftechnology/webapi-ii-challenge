// import your node modules
const express = require("express");
const db = require('./data/db.js');
const bodyParser = require('body-parser');
const cors = require("cors");

// add your server code starting here
const server = express();
const port = 5000;

server.use(bodyParser.json());

server.use(cors());
///////////////////////////////
/// GET
server
.get("/api/posts", (req,res) => {
    db.find()
    .then(posts => {
        if(Object.keys(posts).length !== 0){
            res.status(200).json(posts)
        } else {
            console.log("Posts were not found")
            res.status(404).json({ message: `The posts requested were not found` })
        }

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({error:"There was an error while retreiving this post on the database" });
    });
})

server
.get("/api/posts/:id", (req,res) => {
    const id = req.params.id;
    db.findById(id)
    .then(post => {
        if(Object.keys(post).length !== 0){
            res.status(200).json(post);
        } else {
            console.log("This post was not found");
            res.status(404).json({ message: `The post with the specified ${id} does not exist.` });
        }

    })
    .catch(err => {
        console.log(err)
        res.status(500).json({ error: "There was an error while retreiving this post on the database" });
    });
})
///////////////////////////////
/// POSTS
server
.post("/api/posts", (req,res) => {
    const keys = Object.keys(req.body);

    function testKeys() {
        return [].includes.call(arguments,"title") && [].includes.call(arguments,"contents");
    };
    const truth = testKeys(...keys);
    
    if(truth){
        db.insert(req.body)
        .then(response => {
            console.log(response);
            res.status(201).json(response)
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        });
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})

///////////////////////////////
/// DELETE

server
.delete("/api/posts/:id", (req,res) => {
    const id = req.params.id;
    db.remove(id)
    .then(deleted => {
        if(deleted){
            res.status(200).json({ message: `The post with the specified ${id} has been deleted.` });
        } else {
            console.log("This post was not found");
            res.status(404).json({ message: `The post with the specified ${id} does not exist.` });
        }

    })
    .catch(err => {
        console.log(err);
        res.status(500).json({ error: "The post could not be removed" });
    });
})

///////////////////////////////
/// PUT

server
.put("/api/posts/:id", (req,res) => {
    const id = req.params.id;

    const keys = Object.keys(req.body);

    function testKeys() {
        return [].includes.call(arguments,"title") && [].includes.call(arguments,"contents");
    };
    const truth = testKeys(...keys);

    if(truth){
        db.update(id,req.body)
        .then(response => {
            if(response){
                res.status(200).json({ message: `The post with the specified ${id} has been update.` });
            } else {
                res.status(404).json({ message: `The post with the specified ${id} does not exist.` });
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: `There was an error while update ${id} the post to the database` });
        });
    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
})




server.listen(port, () => console.log(`The server is listening on port ${port}`));