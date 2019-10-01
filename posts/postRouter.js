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


  router.delete('/:id', (req, res) => {
      const id = req.params.id;
      DateBase.remove(id)
      .then(deleted => {
          console.log(deleted);
          if (deleted) {
              res.status(200).json(id);
          } else {
              res.status(404).json({message: "The post with the specified ID does not exist "})
          }
      })
      .catch(error => {
          console.log(error);
          res.status(500).json({error: "there was an error deleteing the post"})
      })
  }) 

  router.put('/:id', (req,res) => {
      const id = req.params.id;
      const title = req.body.title;
      const contents = req.body.contents;
      if( !title && !contents) {
          return res.status(400).json({error: " Please porvide title and contents for the people"})
      }
      DateBase.update(id, {title, contents })
      .then(update => {
          console.log(updated);
          if (updated) {
              DateBase.findById(id)
              .then(post => {
                  console.log(post)
                  if(post.length) {
                      res.status(200).json(post)
                  } else {
                      res.status(404).json({message:"The post with the ID does not exists"})
                  }
              })
              .catch(error => {
                console.log(error);
                res.status(500).json({error: "there was an error deleteing the post"})
              })
          }
      })
  })


router.get('/:post_id/comments', (req,res ) => {
    const {post_id} = req.params;
    DateBase.findById(post_id)
    .then(post => {
        if(post.length) {
            DateBase.findPostComments(post_id)
            .then(comments => 
                res.status(200).json(comments))
        } else {
            res.status(404).json({message: "The post with the ID does not exist"})
        }
    })
    .catch (error => {
        console.log(error);
        res.status(500).json({error: "The comments information could not be retrieved"})
    });
    });

    router.post('/:post_id/comments', (req, res) => {
        const { post_id } = req.params;
        const text = req.body.text;
        DateBase.insertComment({text, post_id})
        .then(comment => {
            res.status(200).json(comment)
        })
        .catch (error => {
            console.log(error);
            res.status(500).json({error: "The comments information could not be retrieved"})
    
    })
})
})

module.exports = router;