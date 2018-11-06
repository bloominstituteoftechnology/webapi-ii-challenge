// import your node modules
const express = require("express");
const db = require('./data/db.js');
const cors = require('cors');

// add your server code starting here
const server = express();
server.use(cors(), express.json());

server.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "The posts information could not be retrieved." },
                console.log(err))
        })
})

server.get('/api/posts/:id', (req, res) => {
    const { id } = req.params;

    db.findById(id)
        .then(posts => {
            if (posts[0] === undefined){
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                res.status(200).json(posts);
            }
        })
        .catch(err => {
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})

server.post("/api/posts", async (req, res) => {
    try {
        const postData = req.body;
        await postData.title === "" || postData.contents === "" ?
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." }):
            res.status(201).json(postData);
    } catch (error) {
        res.status(500).json({ error: "There was an error while saving the post to the database" })
    }
})

server.listen(9001, () => console.log("the server is on!"));