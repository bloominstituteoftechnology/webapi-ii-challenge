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
        res.status(500).json({ error: "The post information could not be retrieved." })
    })
});

router.post('/', (req, res) => {
    Posts.insert(req.body)
    .then(addPost => {
        if (addPost) {
            res.status(201).json(addPost)
        } else {
            res.status(500).json({ error: "There was an error while saving the post to the database" })
        }
    })
    .catch(error => {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    })
});


module.exports = router;