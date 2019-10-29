const router = require('express').Router();

const db = require('./data/db');

router.get('/', (req, res) => {
    db.find()
        .then(posts => {
            res.status(200).json(posts);
        })
        .catch(err => {
            console.log('\n=== ERROR ===\n', error);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })
})

router.get('/:id', (req, res) => {
    const postID = req.params.id;
    
    db.findById(postID)
        .then(post => {
            if (!post.length) {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            } else {
                res.status(200).json(post);
            }
        })
        .catch(err => {
            console.log('\n=== ERROR ===\n', error);
            res.status(500).json({ error: "The post information could not be retrieved." })
        });
})

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
                console.log('\n=== ERROR ===\n', error);
                res.status(500).json({ error: "The comments information could not be retrieved." })
            });
        }
    })
    .catch(err => {
        console.log('\n=== ERROR ===\n', error);
        res.status(500).json({ error: "The comments information could not be retrieved." })
    });
    
});


module.exports = router;