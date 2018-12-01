// import your node modules
const express = require("express");
const db = require("./data/db.js");

// add your server code starting here
const server = express();
const PORT = 5555;
server.disable('etag')
server.use(express.json());
server.get("/api/posts", (req, res) => {
db.find()
    .then(posts => {
        res
            .status(200)
            .json(posts);
    })
    .catch(err => {
    res
        .status(500)
        .json({ error: "The posts information could not be retrieved." });
    });
});

server.get("/api/posts/:id", (req, res) => {
const { id } = req.params;

db.findById(id)
    .then(post => {
    if (post.length) {
        res.json(post);
    } else {
        res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
    })
    .catch(err => {
    res
        .status(500)
        .json({ error: "The post information could not be retrieved." });
    });
});

server.post("/api/posts", (req, res) => {
    const posts= req.body;
    if (posts.title && posts.contents) {
        db.insert(posts)
        .then(response => {
            db.findById(response.id).then(posts => {
                res.status(201)
                .json(posts)
            })
        })
        .catch(err => {
            res
                .status(500)
                .json({ error: "There was an error saving the post to the server" })
        })
    } else {
        res
            .status(400)
            .json({ errormessage: "Please provide title and content for the post." })
    }
})



server.listen(PORT, () => {
  console.log("server is up and running");
});