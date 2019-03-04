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

//DELETE

//PUT

//POST





module.exports = router;