const express = require('express');
const db = require('./db');
const router = express.Router();

router.post('/', (req, res) => {
    const { title, contents } = req.body
    if (!title || !contents) {
        res.status(400).json({
            errorMessage: "Please provide title and contents for the post."
        })
    }
    else {
        db.insert(req.body)
            .then(post => {
                res.status(201).json({ success: true, post })
            })
            .catch(error => {
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.post("/:id/comments", (req, res) => {
    let { id } = req.params;
    let comment = req.body;
    comment.post_id = id;
    if (!comment || !comment.text) {
        res
            .status(400)
            .json({ errorMessage: "Please provide text for the comment." });
    } else {
        db.insertComment(comment)
            .then(data => {
                db.findCommentById(data.id)
                    .then(data => {
                        res.status(201).json(data);
                    })
                    .catch(err => {
                        res.status(500).json({
                            error:
                                "Error in sending back newly created comment, but it was created."
                        });
                    });
            })
            .catch(err => {
                res.status(500).json({
                    error: "There was an error while saving the comment to the database"
                });
            });
    }
});

router.get('/', (req, res) => {
    db.find()
        .then(post => {
            res.status(200).json({ success: true, post })
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const { id } = req.params
    db.findById(id)
        .then(post => {
            if (post.length > 1) {
                res.status(200).json(post)
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id/comments', (req, res) => {
    const { id } = req.params
    db.findPostComments(id)
        .then(post => {
            if (!post || post.length === 0) {
                res.status(400).json({ message: "The post with the specified ID does not exist." })
            }
            else {
                res.status(200).json(post)
            }
        })
        .catch(error => {
            res.status(500).json({ error: "The comments information could not be retrieved." })
        })
})

router.delete("/:id", (req, res) => {
    db.remove(req.params.id)
        .then(userdata => {
            if (userdata && userdata > 0) {
                res.status(200).json({
                    message: "the user was deleted."
                });
            } else {
                res
                    .status(404)
                    .json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The post could not be removed" });
        });
});


router.put("/:id", (req, res) => {
    const { title, content } = req.body;
    if (!title || !content) {
        res
            .status(400)
            .json({ errorMessage: "Please provide title and content for the post." });
    } else {
        db.update(req.params.id, req.body)
            .then(user => {
                if (user) {
                    res.status(200).json(user);
                } else {
                    res.status(404).json({
                        message: "The post with the specified ID does not exist."
                    });
                }
            })
            .catch(() => {
                res.status(500).json({
                    errorMessage: "The post information could not be modified."
                });
            });
    }
});

module.exports = router