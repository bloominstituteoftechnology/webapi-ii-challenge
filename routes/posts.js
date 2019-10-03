const express = require('express');
const db = require('../data/db');

const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(posts => {
        res.status(200).json(posts)
    })
    .catch(err => {
        res.status(500).json({err  : "Posts could not be loaded."})
    })
});

router.get('/:id', (req, res) => {
    console.log(req.params.id);
    let id = req.params.id;
        db.findById(id)
            .then(post => {
                res.status(200).json(post)
            })
            .catch(err =>{
                res.status(500).json({err : "ID could not be found"})
            })
});

router.get('/:id/comments', (req, res) => {
    db.findPostComments()
        .then(comments => {
            res.status(200).json(comments)
        })
        .catch(err =>{
            res.status(500).json({err : "Could not load comments"})
        })
});

router.post(`/`, (req, res) => {
    const title = req.params.title; 
    const contents = req.params.contents; 
    const createdAt = req.params.created_at;
    const updatedAt = req.params.updated_at;

 
    if(!title || !contents){
        res.status(400).json({ errorMessage: "Please provide title and contents for the post." })
    }
    else{
        db.insert(req.body)
            .then(post => {
                res.status(201).json({post})
            })
            .catch(err => {
                res.status(500).json({err : "Could not insert post. Check post structure & try again."})
            })
    }
})
router.post('/:id/comments', (req, res) => {
    
    const comment = req.body;
    if(!comment.postID){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else if(!comment.text){
        res.status(400).json({ errorMessage: "Please provide text for the comment." })
    }
    else if(comment.postID && comment.text){
        db.insertComment(comment)
            .then(result => {
                res.status(201).json(result)
            })
            .catch(err => {
                res.status(500).json({err : "Could not insert comment. Check post structure & try again."})
            })
    }
    }
)

router.delete('/:id', (req,res => {
    const id = req.params.id;
    if(!comment.postID){
        res.status(404).json({ message: "The post with the specified ID does not exist." })
    }
    else{
        db.remove(id)
            .then(deleted => {
                if(deleted){
                    res.status(200).json({message : "Deleted", deleted})
                }
            })
            .catch(err => {
                res.setEncoding(500).json({
                    error: "The pose is unable to be removed"
                })
            })
    }
}))

server.put("/:id", (req, res) => {
    const id = req.params.id;
    const update = req.body;
  
    if (!update.title && !update.contents)
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    else {
      db.update(id, update)
        .then(updated => {
          if (updated) {
            db.findById(id)
              .then(post => {
                res.status(200).json({ api: "update working", post });
              })
              .catch(error => {
                res.send(500).json({
                  error: "The user information could not be modified."
                });
              });
          } else {
            res.status(404).json({
              message: "The user with the specified ID does not exist."
            });
          }
        })
        .catch(error => {
          res.send(500).json({
            error: "The user information could not be modified."
          });
        });
    }
  });

module.exports = router;