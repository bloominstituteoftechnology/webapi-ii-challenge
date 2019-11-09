const router = require("express").Router();

const db = require('../data/db');

router.get('/', (req, res) => {
    db.find()
        .then((data) => res.status(200).json(data))
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

router.get('/:id', (req, res) => {
    const postId = req.params.id;
    db.findById(postId)
        .then((post) => {
            console.log(post, post.length);
            if (post.length > 0) {
                res.status(200).json(post)
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." })
            }
        })
        .catch(err => res.status(500).json({ error: "The posts information could not be retrieved." }))
});

router.post('/', (req, res) => {
    const post = req.body;
    console.log(post);

    if (post.title == undefined || post.contents == undefined) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    db.insert(post)
        .then(post => res.status(201).json(post))
        .catch(err => res.status(500).json({ error: "There was an error while saving the post to the database" }));
});



module.exports = router;