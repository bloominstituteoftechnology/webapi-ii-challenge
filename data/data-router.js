const express = require('express');
const Posts = require('./db.js');
const router = express.Router();
router.use(express.json());

//GET
router.get("/", async (req, res) => {
  try {
    const posts = await Posts.find(req.query);
    res.status(200).json(posts);
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({error: "The posts information could not be retrieved."});
  }
});

//GET ID

router.get('/:id', async (req, res) => {
  try {
    const post = await Posts.findById(req.params.id);

    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: 'The post information could not be retrieved.',
    });
  }
});

//DELETE

//PUT

//POST





module.exports = router;