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
        // res.json(post);
    if (post) {
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
    const postsInfo = req.body;

    db.insert(postsInfo)
        .then(post => {
                res.status(201)
                .json(post)

        })
        .catch(err => {
            if (err.errno === 19) {
                res.status(400).json({ errorMessage: "Please provide title and contents for the post." })

            }
            else {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            }
            })
})

server.listen(PORT, () => {
  console.log("server is up and running");
});
