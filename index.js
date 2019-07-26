const express = require("express");

const db = require("./data/db");

const server = express();

server.use(express.json());

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

server.get("/api/posts/:postId/comments", (req, res) => {
    // GET /api/posts/<postId>/comments
    const { postId } = req.params;

    db.findPostComments(postId)
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

server.listen(4000, () => {
    console.log("listening on port 4000...");
});
