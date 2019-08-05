const express = require("express");

const Posts = require("./db.js");

const router = express.Router();

module.exports = router;

router.post("/", async (req, res) => {
    const newPost = req.body;

    if (newPost.title && newPost.contents) {
        try {
            const post = await Posts.insert(req.body);
            res.status(201).json(post);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message:
                    "There was an error while saving the user to the database"
            });
        }
    } else {
        res.status(400).json({
            err: "Please provide title and contents for the post."
        });
    }
});

router.post("/:id/comments", async (req, res) => {
    const commentData = { ...req.body, post_id: req.params.id };

    try {
        const saved = await Hubs.insertComment(commentData);
        res.status(201).json(saved);
    } catch (err) {
        res.status(500).json({
            message: "failed to save message",
            err
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "The posts information could not be retrieved."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The post information could not be retrieved"
        });
    }
});

router.get("/:id/comments", async (req, res) => {
    try {
        const comments = await Posts.findCommentById(req.params.id);

        if (comments.length) {
            res.json(comments);
        } else {
            res.status(404).json({
                err: "The post with the specified ID does not exist."
            });
        }
    } catch (err) {
        res.status(500).json({
            err: "The comments information could not be retrieved."
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const post = await Posts.remove(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The post could not be removed."
        });
    }
});

router.put("/:id", async (req, res) => {
    const updatedPost = req.body;

    if (updatedPost.title && updatedPost.contents) {
        try {
            const post = await Posts.update(req.params.id, req.body);
            res.status(200).json(post);
        } catch (err) {
            console.log(err);
            res.status(500).json({
                message: "The post information could not be modified."
            });
        }
    } else {
        res.status(400).json({
            err: "Please provide title and contents for the post."
        });
    }
});
