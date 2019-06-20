const router = require('express').Router();
const Posts = require('../data/db');

router.get('/',  (req, res) => {
    const posts = Posts.find(req.params)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(errorMessage => {
        res.status(500).json({ error: "The posts information could not be retrieved." })
    })
});

router.get('/:id', (req, res) => {
    const post = Posts.findById(req.params.id)
    .then(post => {
        if (post) {
        res.status(200).json(post)
    } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    })
    .catch(error => {
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    })
})

module.exports = router;