const express = require('express');
const db = require('./data/db.js');
const router = express.Router();


//POSTS
router.post('/', (req, res) => {
    const newPost = req.body;
    db.insert(newPost)
    .then(data => {
        res.status(201).json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the post to the database'
        })
    })
})

router.post('/:id/comments', (req, res) => {
    const newComment = req.body;
    const { id } = req.params;
    db.findById(id)
    .then(found => {
        if (found) {
            db.insert(newComment);
            res.status(201).json(found);
        } else {
            res.status(400).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'There was an error while saving the comment to the database'
        })
    })
})


//GETS

router.get('/', (req, res) => {
    db.find()
    .then(data => {
        res.json(data);
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The posts information could not be retrieved.'
        })
    })
});

router.get('/:id' , (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(found => {
        if (found) {
            res.json(found);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The post information could not be retrieved.'
        })
    })
})

router.get('/:id/comments' , (req, res) => {
    const { id } = req.params;
    db.findById(id)
    .then(found => {
        if (found) {
            res.json(found);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The comments information could not be retrieved.'
        })
    })
})




//DELETE

router.delete('/:id', (req, res) => {
    const { id } = req.params;
    db.remove(id)
    .then(deletedUser => {
        if (deletedUser) {
            res.json(deletedUser);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The post could not be removed'
        })
    })
})



//PUT

router.put('/:id', (req, res) => {
    const { id } = req.params;
    const changes = req.body
    db.update(id, changes)
    .then(updated => {
        if (updated) {
            res.json(updated);
        } else {
            res.status(404).json({
                message: 'The post with the specified ID does not exist.'
            })
        }
    })
    .catch(err => {
        res.status(500).json({
            err: err,
            message: 'The post information could not be modified.'
        })
    })
})




module.exports = router;