const express = require('express');
const Blogs = require('../data/db');

const router = express.Router();




router.get('/', ((req, res) => {
    Blogs.find()
        .then(posts => {
            res.status(200).json(posts)
        })
        .catch(err => {
            res.status(404).json({message: 'this isnt wokring'})
        })
}))


router.post('/', ((req, res) => {
    const {title, contents} = req.body;
    if (!title || !contents){
        res.status(400).json({
            errorMessage: 'you must have the title and contents'
        })
    } else {
      Blogs.insert(req.body)
        .then(postId => {
            return postId.id;
            }) .then(id => {
                Blogs.findById(id)
            }) .then(post => {
                res.status(201).json(post);
            }) .catch(err => {
                res.status(500).json({error: 'could not retreive info'})
            })
        .catch( err => {
            res.status(500).json({error: 'not working'})
        })
    }
}))



router.put('/:id', (req,res) => {
    const id = req.body.id
    const posts = req.body

    Blogs.update(id, posts)
        .then(post => {
            res.status(200).json(post)
        })

        .catch(err => {
            res.status(404).json({error: "there is an error"})
        })
})


router.delete('/:id', (req,res) => {
    const id = req.body.id
    Blogs.remove(id)
        .then(post => {
            res.status(200).json({message: 'post has been deleted'})
        })
        .catch(err => {
            res.status(404).json({errorMessage: "this didnt work"})
        })
})












module.exports = router;