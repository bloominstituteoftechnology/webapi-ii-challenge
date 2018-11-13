// import your node modules
const express = require("express");
const server = express();
const db = require("./data/db.js");
const cors = require("cors");

// add your server code starting here

server.use(cors());
server.use(express.json());

server.get("/api/posts", (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(500).json({
                error: "The posts information could not be retrieved.",
                error: err
            });
        })
})

server.get("/api/posts:id", (req, res) => {
    const {
        id
    } = req.params

    db.findById(id)
        .then(post => {
            if (post) {
                res.status(200).json(post)
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be retrieved.",
                error: err
            })
        })
})

server.post("/api/posts", async (req, res) => {
    console,
    log("post", req.body)
    try {
        const postData = req.body;
        const postId = await db.insert(postData)
        res.status(201).json(post);
    } catch (error) {
        let message = "There was an error while saving the post to the database"
        
    }
})

server.listen(9000, () => console.log("\n== the server is alive! ==\n"));