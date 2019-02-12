const express = require('express');

const Posts = require('../data/db');

const router = express.Router();

router.get('/', async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The posts information could not be retrieved.",
        });
    }
});

router.get('/:id', async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post){
            res.status(200).json(post);
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist."});
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "The post information could not be retrieved.",
        });
    }
});

// router.get('/:id', (req, res) => {
//     const { id } = req.params;
//     Posts
//         .findById(id)
//         .then(post => {
//             if (!post){
//                 res.status(404).json({ message: "The post with the specified ID does not exist."});
//             } else {
//                 res.status(200).json(post);
//             }
//         })
//         .catch(error => {
//             res.status(500).json({ error: "The post information could not be retrieved."});
//         });
// });

router.post('/', (req, res) => {
    const post = req.body;
    if (!post.title || !post.contents){
        res.status(400).json({ message: "Please add title and contents to the post"});
    }
    Posts
        .insert(post)
        .then(post => {
            res.status(201).json(post);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ message: "Error while saving the post to the database"});
        });
})

router.delete('/:id', async (req, res) => {
    try {
        const count = await Posts.remove(req.params.id);
        if (count > 0){
            res.status(200).json({ message: 'This post is goneso!'});
        } else {
            res.status(404).json({ message: "The post with the specified ID does not exist." });
        }
    } catch(error) {
        console.log(error);
        res.status(500).json({
            message: "The post could not be removed",
        });
    }
});

// router.put('/:id', async (req, res) => {
//     try {
//         const post = await Posts.update(req.params.id, req.body);
//         if (post){
//             res.status(200).json(post);
//         } else {
//             res.status(404).json({ message: "The post with the specified ID does not exist."});
//         }
//     } catch(error){
//         console.log(error);
//         res.status(500).json({ message: "The post information could not be modified.",})
//     }
// });

router.put('/:id', (req, res) => {
    const { id } = req.params.id;
    const changes = req.body;
    if (!changes.title || !changes.contents){
        res.status(400).json({ message: "Please provide title and contents for the post."});
    }
    Posts
        .update(id, changes)
        .then(updatedPost => {
            if (updatedPost){
                res.status(200).json({updated});
            } else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
        })
        .catch(error => {
            res.status(500).json({error: "The post information could not be modified." })
        });
})

module.exports = router;