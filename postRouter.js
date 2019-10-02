const express = require('express');
const db = require('./data/db.js');

const router = express.Router();

router.get('/', (req, res) => {
    db.find()
        .then(posts => res.status(200).json(posts))
        .catch(err => {
            console.log(err);
            res.status(500).json({ error: "The posts information could not be retrieved." })
        })        
})

router.post('/', (req, res) => {
    const { title, contents } = req.body;
    if (!title || !contents) {
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    } else {
        db.insert({title, contents})
            .then(({id}) => {
                db.findById(id)
                    .then(([post]) => {
                        res.status(201).json(post);
                    })
            })
            .catch(err => {
                console.log(err);
                res.status(500).json({ error: "There was an error while saving the post to the database" })
            })
    }
})

router.get('/:id', (req, res) => {
    const { id } = req.params;
    db.findById(id)
        .then(([post]) => {
            console.log(post);
            if (post) {
                res.status(200).json(post);
            } else {
                res.status(404).json({
                    err: err,
                    message: "The post with the specified ID does not exist." 
                })
            }
            
        })
})

module.exports = router;