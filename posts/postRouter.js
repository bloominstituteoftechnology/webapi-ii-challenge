const express = require('express');
const DateBase = require('../data/db.js');

const router = express.Router();

router.get('/', (req,res) => {
    DateBase.find()
    .then(posts => res.status(200).json(posts))
    .catch(error => {
        console.log(error);
        res.status(500).json({ error: "The posts information could not be retrieved"})
    })
});

router.post('/', (req, res) => {
    const title = req.body.title;
    const contents = req.body.contents
    if (!title || !contents) {
        res.status(400).json ({error: "Please provide title and contents for the post."})
    } else {
        DateBase.insert({ title, contents })
         .then(( {id }) => {
             DateBase.findById(id)
             .then(({post}) => {
                 res.status(201).json(post)
             })
             .catch(error => {
                 console.log(error)
             })
         })
         .catch(error => {
             console.log(error);
             res.status(500).json({ error: "There was an error while saving the post the datebase"})
         })
    }
})








router.get('/:id', (req, res) => {
    const id = req.params.id;
    DateBase.findById(id)
    .then(post => {
        console.log(post);
        if(post.length) {
            res.status(200).json(post)
        } else {
            res.status(500).json ({message: 'The post with the sqecified ID does not exist.'})
        }
    })
})

module.exports = router;