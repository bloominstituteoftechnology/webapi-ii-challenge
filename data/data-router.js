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

router.delete('/:id', async (req, res) => {
  try {
    const post = await Posts.remove(req.params.id);
    if (post > 0) {
      res.status(200).json({ message: "The post has been removed" });
    } else {
      res.status(404).json({ message: "The post with the specified ID does not exist."  });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The post could not be removed" ,
    });
  }
});

//PUT


router.put('/:id', async (req, res) => {

  const { title, contents } = req.body

  try {
    const post = await Posts.update(req.params.id, { title, contents });
    if (post) {
      res.status(200).json(post);
    } else {
      res.status(404).json({ message: "Please provide title and contents for the post." });
    }
  } catch (error) {
    // log error to database
    console.log(error);
    res.status(500).json({
      message: "The post information could not be modified.",
    });
  }
});

//POST

// router.post('/:id/messages', async (req, res) => {
//   const newMessage = req.body;
//   newMessage.hub_id = req.params.id;

//   try {
//     const hub = await Hubs.findById(req.params.id);

//     if (hub) {
//       const message = await Hubs.addMessage(newMessage);
//       res.status(201).json(message);
//     } else {
//       res.status(400).json({err: 'invalid hub id'});
//     }
//   } catch (e) {
//     res.status(500).json({err: e});
//   }

// });




module.exports = router;