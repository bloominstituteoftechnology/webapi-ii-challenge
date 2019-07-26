const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

server.post("/api/posts", (req, res) => {
    // POST /api/posts
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
