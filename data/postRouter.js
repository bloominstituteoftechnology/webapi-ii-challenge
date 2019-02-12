const express = require('express');

const db = require('./db.js');

const router = express.Router();



// server.use(express.json());
// server.use(cors());



router.get('/', (req, res) => {
    db
        .find()
        .then(posts => {
            res.status(200).json({success: true, posts})
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The posts information could not be retrieved."});
    });
});

router.get('/:id', (req, res) => {
    const {id} = req.params;

    db
        .findById(id)
        .then(posts => {
            if(posts){
                res.status(200).json({success: true, posts})
            } else {
                res.status(404).json({
                    success: false,
                    error: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The post information could not be retrieved."});
    });
});

router.post('/', (req, res) => {
    const post = req.body;

    console.log(post.title, post.contents);

    db.insert(post)
        .then(post =>{
            if (!post.title || !post.contents) {
                res.status(201).json({success: true, post})}
            else {
                res.status(400).json({success: false, error: "Please provide title and contents for the post."})
            }
        }
        )
        .catch(() => {
            res.status(500).json({success: false, error: "There was an error while saving the post to the database"})
        })
});

router.delete('/:id', (req, res) => {
    const {id} = req.params;

    db.remove(id)
        .then(deleted => {
            if(deleted){
                res.status(204).end();
            } else {
                res.status(404).json({
                    success: false,
                    error: "The post with the specified ID does not exist."
                })
            }
            
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The post could not be removed"})
        });
});

router.put('/:id', (req, res) =>{
    const {id} = req.params;
    const changes = req.body;

    db
        .update(id, changes)
        .then(updated => {

            if (changes.title == undefined || changes.contents === undefined) {
                res.status(400).json({success: false, error: "Please provide title and contents for the post."})
            }
            else if(updated) {res.status(200).json({success: true, updated});
            } else {
                res.status(404).json({
                    success: false,
                    error: "The post with the specified ID does not exist."
                })
            }
        })
        .catch(() => {
            res.status(500).json({success: false, error: "The post information could not be modified."});
        });
});


module.exports = router;