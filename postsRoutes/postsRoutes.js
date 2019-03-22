const express = require('express');

const router = express.Router();

const db = require('../data/db');

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.json(posts);
        })
        .catch(err => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        });
});


router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(post => {
        if (post.length) {
            res.json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    }).catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

router.post('/', (req, res) => {
    const newPost = req.body;
    if (newPost.title && newPost.contents) {
        db.insert(newPost)
            .then(postIdObj => {
                db.findById(postIdObj.id)
                    .then(post => {
                        res.status(201).json(post);
                    });
            })
            .catch(err => {
                res.status(500).json({ error: "There was an error while saving the post to the database." });
            });

    } else {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
});


router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id).then(post => {
        const deletedPost = post;
        db.remove(id)
            .then(countDeleted => {
                if (countDeleted) {
                    res.json({
                        Message: `Post ${id} was successfully deleted.`,
                        post: deletedPost
                    });
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                }
            })
            .catch(err => {
                res.status(500).json({ error: "The post could not be removed" });
            })
    }).catch(err => {
        res.status(500).json({ error: "The post information could not be retrieved." });
    })
});

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const postChanges = req.body;

    if (postChanges.title || postChanges.contents) {

        db.update(id, postChanges)
            .then(countUpdated => {
                if (countUpdated) {
                    db.findById(id)
                        .then(post => {
                            res.json(post);
                        });
                } else {
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                }
            }).catch(err => {
                res.status(500).json({ error: "The post information could not be modified." });
            });
    } else {
        res.status(400).json({ errorMessage: "Please provide title or contents for the post." });
    }
})


module.exports = router;