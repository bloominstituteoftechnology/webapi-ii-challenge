//imports:
const express = require('express');
const db = require('./db.js');

//Router() --> express! 
const router = express.Router();

//ENDPOINTS
//*************GET********************
router.get('/', (req, res) => {
    db.find(req.query)
        .then(post => {
            res.status(200).json(post);
        })
        .catch(error => {
            res.status(500).json({ error: "The posts information could not be retrieved." });
        })
})
//*************GET (id) ********************

router.get('/:id', (req, res) => {
    db.findById(req.params.id)
        .then(postObj => {
            console.log(postObj)
            if (postObj.length > 0) {
                res.status(200).json(postObj);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
            
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "The post information could not be retrieved." });
        })
})
//************* GET(comments for a specific post!) Attempt I********************
// router.get('/:id/comments', (req, res) => {
//     const { id } = req.params;
//     const { comments } = req.params;
//     db.findPostComments(id, comments)
//         .then(comments => {
//             console.log(comments)
//             res.status(200).json(comments);
            
//         })
//         .catch(error => {
//             console.log(error);
//             res.status(500).json({error: "The post information could not be retrieved."});
//         })
// })
//************* GET(comments for a specific post!) Attempt II Works********************
router.get('/:id/comments', (req, res) => {
    const { id } = req.params;

    db.findPostComments(id)
        .then(comments => {
            console.log(comments)
            if (comments.length > 0) {
                res.status(200).json(comments);
            }
            else {
                res.status(404).json({ message: "The post with the specified ID does not exist." });
            }
           
            
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({error: "The post information could not be retrieved."});
        })
})










//export:
module.exports = router;