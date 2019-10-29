const router = require('express').Router();

const db = require('./data/db');

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log('\n=== ERROR ===\n', err);
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
});

router.get('/:id', (req, res) => {
    const postID = req.params.id;
    
    db.findById(postID)
        .then(post => {
            if (!post.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            console.log('\n=== ERROR ===\n', err);
            res.status(500).json({ error: "The post information could not be retrieved." });
        });
});

router.get('/:id/comments', (req, res) => {
    const postID = req.params.id;

    db.findById(postID)
    .then(post => {
        if (!post.length) {
            res.status(404).json({ message: "The post with the specified ID does not exist." })
        } else {
            db.findPostComments(postID)
            .then(comments => res.status(200).json(comments))
            .catch(err => {
                console.log('\n=== ERROR ===\n', err);
                res.status(500).json({ error: "The comments information could not be retrieved." })
            });
        }
    })
    .catch(err => {
        console.log('\n=== ERROR ===\n', err);
        res.status(500).json({ error: "The comments information could not be retrieved." })
    });
    
});

router.post('/', (req, res) => {
    const newPost = req.body;

    if (!newPost.title || !newPost.contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert(newPost)
            .then(confirmation => {
                db.findById(confirmation.id)
                    .then(newlyPosted => {
                        res.status(201).json(newlyPosted);
                    })
                    .catch(err => {
                        console.log('\n=== ERROR ===\n', err);
                        res.status(500).json({ error: "There was an error while saving the post to the database" });
                    });
                })
            .catch(err => {
                console.log('\n=== ERROR ===\n', err);
                res.status(500).json({ error: "There was an error while saving the post to the database" });
            });
    }
});


router.post('/:id/comments', (req, res) => {
    const postID = req.params.id;
    const newComment = req.body;

    if (!newComment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    } else {
        db.findById(postID)
        .then(post => {
            if (!post.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                db.insertComment({ ...newComment, post_id: postID})
                    .then(commentID => {
                        db.findCommentById(commentID.id)
                            .then(commented => {
                                res.status(201).json(commented);
                            })
                            .catch(err => {
                                console.log('\n=== ERROR ===\n', err);
                                res.status(500).json({ error: "There was an error while saving the comment to the database" })
                            });
                    })
                    .catch(err => {
                        console.log('\n=== ERROR ===\n', err);
                        res.status(500).json({ error: "There was an error while saving the comment to the database" })
                    });        
            }
        })
        .catch(err => {
            console.log('\n=== ERROR ===\n', err);
            res.status(500).json({ error: "There was an error while saving the comment to the database" })
        });
    }    
});


module.exports = router;