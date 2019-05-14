const express = require('express');

const Posts = require('./db.js');

const router = express();

// router.get('/', (req, res) => {
//   res.send('<h2> bout that blog life</h2>');
// });

//find (all posts)
router.get('/', async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error retrieving the posts',
    });
  }
});

//find by id
router.get('/:id/posts', async (req, res) => {
  const { id } = req.params;

  try {
    const posts = await Posts.findById(id);

    if (posts.length) {
      res.json(posts);
    } else {
      res.status(404).json({ err: 'no posts avail'});
    }
  } catch (err) {
    res.status(500).json({ err });
  }
});


//insert
// router.post('/:id/posts', async (req, res) => {
//   try {
//     const post = await Posts.insert(req.body);
//     res.status(201).json(post);
//   } catch (error) {
//     // log error to database
//     console.log(error);
//     res.status(500).json({
//       message: 'Error adding the post'
//     });
//   }
// });

router.post('/:id/posts', async (req, res) => {
  const postInfo = { ...req.body, post_id: req.params.id };

  try {
    const saved = await Posts.insert(postInfo);
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json( {
      message: 'failed to save post',
      err
    });
  }

});

//update
router.put('/:id', async (req, res) => {
  try {
    const post = await Posts.update(req.params.id, req.body);
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error updating the post'
    });
  }
});

//remove
router.delete('/api/posts/:id', async (req, res) => {
  try {
    const count = await Posts.remove(req.params.id);
    if (count > 0) {
      res.status(200).json({ message: 'The post has been nuked' });
    } else {
      res.status(404).json({ message: 'The post could not be found' });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'Error removing the post'
    });
  }
});

module.exports = router;
