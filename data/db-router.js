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
//************* POST(/api/posts) ********************
router.post('/', (req, res) => {
    const postI = req.body;
    
    // db.insert(postI)
        // .then(post => {
        //     console.log("postI",postI);
        //     console.log("post", post);
    if(!postI.title || !postI.contents){
        console.log(postI.title);
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
    }
    else {
        db.insert(postI)
        .then(post => {
            res.status(201).json(post)
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the post to the database" });
        })
    }
    })
       
//************* POST(/api/posts/:id/comment) ********************
router.post('/:id/comments', (req, res) => {
    const comment = req.body;
    const { id } = req.params;
    // if(!comment.text) {
    //     res.status(400).json({ errorMessage: "Please provide text for the comment." });
    // }
    // else if()

    if(!comment.post_id){
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    if(!comment.text) {
        res.status(400).json({ errorMessage: "Please provide text for the comment." });
    }
    if(id && comment.text) {
        db.insertComment(comment)
        .then(postComment => {
            res.status(201).json(postComment);
        })
        .catch(error => {
            console.log(error);
            res.status(500).json({ error: "There was an error while saving the comment to the database"});
        })
    }
})

//Delete endpoint:
router.delete('/:id', (req,res) => {
    //Removes the post with the specified id and returns the deleted post object. 
    const id = req.params.id;
    if(!id) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
    else{
        db.remove(id)
            .then(d => {
                res.status(202).json(d);
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The post could not be removed" });
            });
    }
})

//PUT --> /api/posts/:id
router.put('/:id', (req,res) => {
    //Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
    const id = req.params.id;
    const bodyPut = req.body;
 
        if(!bodyPut.title || !bodyPut.contents){
            res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
        }
        //Q: how to check if id is in the Database???? :/ 
        else{
            db.update(id, bodyPut)
            
                // db.update(id, bodyPut)
            .then(change => {
                if(change){
                    res.status(200).json(change);
                }
                else{
                    res.status(404).json({ message: "The post with the specified ID does not exist." });
                }
            })
            .catch(error => {
                console.log(error);
                res.status(500).json({ error: "The post information could not be modified." });
            })
        
            
        }
  


})

//export:
module.exports = router;