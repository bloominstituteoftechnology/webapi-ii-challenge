const router = require('express').Router();
const Posts = require('../data/db');

router.get('/', async (req, res) => {
    const posts = await Posts.find(req.params)
    .then(posts => {
        res.status(200).json(posts);
    })
    .catch(errorMessage => {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    })
});

module.exports = router;