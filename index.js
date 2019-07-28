const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

server.post("/api/posts", (req, res) => {
    // POST /api/posts

    // required post schema:
    // {
    //     title: "The post title", // String, required
    //     contents: "The post contents", // String, required
    //     created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
    //     updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
    // }
    const postInfo = req.body;
    
    if (postInfo) {
        db.insert(postInfo)
            .then(inserted => {
                res.send(201).json({ postInfo });
            })
            .catch(err => {
                res.send(500).json({
                    error:
                        "There was an error while saving the post to the database."
                });
            });
    } else {
        res.send(400).json({
            errorMessage: "Please provide title and contents for the post."
        });
    }
});

server.post("/api/posts/:id/comments", (req, res) => {
    // POST /api/posts/:id/comments
});

server.get("/", (req, res) => {
    // GET /
    res.send("Hello World!");
});

server.get("/api/posts", (req, res) => {
    // GET /api/posts
    db.find()
        .then(posts => {
            res.status(200).json({
                posts
            });
        })
        .catch(err => {
            res.status(500).json({
                error: "The posts information could not be retrieved."
            });
        });
});

server.get("/api/posts/:id", (req, res) => {
    // GET /api/posts/<id>
    const { id } = req.params;

    db.findById(id)
        .then(post => {
            if (post.length === 1) {
                res.status(200).json({
                    post
                });
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The post information could not be retrieved."
            });
        });
});

server.get("/api/posts/:id/comments", (req, res) => {
    // GET /api/posts/<id>/comments
    const { id } = req.params;

    db.findPostComments(id)
        .then(comments => {
            if (comments) {
                res.status(200).json({
                    comments
                });
            } else {
                res.status(404).json({
                    message: "The post with the specified ID does not exist."
                });
            }
        })
        .catch(err => {
            res.status(500).json({
                error: "The comments information could not be retrieved."
            });
        });
});

server.put("/api/posts/:id", (req, res) => {
    // PUT /api/posts/<id>
});

server.delete("/api/posts/:id", (req, res) => {
    // DELETE /api/posts/<id>
});

server.listen(4000, () => {
    console.log("listening on port 4000...");
});
