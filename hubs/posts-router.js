const express = require('express');

const db = require('../data/db.js');


const router = express.Router();
// URI: /api/posts

router.get('/', (req, res) => {
    db.find()
    .then(posts => {
        console.log(posts)
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({
        err: err
    })
    })

})


router.post('/', (req, res) => {
    const user = req.body;
    console.log('new user', user);
    db.insert(user)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(err => {
            res.status(500).json({
                err: err,
            message: "There was an error while saving the user to the database" 
            })
        })
});
     
router.get('/:id/comments', async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await db.findPostComments(id);
        res.status(200).json(comments);

    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'error finding hub'
        })
    }
})

router.post('/:id/comments', async(req, res) => {
     const commentInfo = {...req.body, post_id: req.params.id};

     try {
         const savedComment = await db.insertComment(commentInfo);
         res.status(201).json(savedComment);
     }

     catch (error) {
         console.log(error);
         res.status(500).json({
             message: 'error'

         })
     }
})

router.get('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const comments = await db.findById(id);
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({
            message: 'Error finding hub messages',
        });
    }
});

module.exports = router;