const express = require('express');
const db = require('../data/db.js');
const router = express.Router();

router.get('/', (req, res) => {
  db.find()
    .then(allPosts => res.status(200).json(allPosts))
    .catch(err => {
      console.log(err);
      res.status(500).json({error: "Couldn't find posts"})
    })
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
    .then((post) => {
      if(post.length > 0){
        res.status(200).json(post);
      } else {
        res.status(404).json({error: " Post does not exists"});
      }
    })
})

router.post('/', (req, res) => {
  const {title, contents} = req.body;

  if(title && contents){
    db.insert({title, contents})
      .then(({id}) => {
        db.findById(id)
          .then(([post]) => {
            res.status(200).json(post)
          })
      })
  } else {
    res.status(400).json({error: "Need both title and contents"})
  }
})

router.put('/:id', (req, res) => {
  const {title, contents} = req.body;
  const { id } = req.params;

  if(title && contents){
    db.update(id, {title, contents})
      .then(({id}) => {
        db.findById(id)
          .then(([post]) => {
            res.status(200).json(post)
          })
      })
  } else {
    res.status(400).json({error: "Need both title and contents"})
  }
})

router.delete('/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
    .then(removed => {
      if(removed){
      res.status(200).end();
      } else {
        res.status(404).json({error: "Post was not found"})
    })
    .catch(err => {
      res.status(500).json({error: "Couldn't delete post"})
    })
})

router.get('/:id/comments', (req, res) => {
  const {id} = req.params;
  db.findPostComments(id)
    .then(comment => {
      res.status(200).json(comments);
    })
    .catch( err => {
      res.status(500).json({error: "Error finding post comment"})
    }
    )
})

module.exports = router;