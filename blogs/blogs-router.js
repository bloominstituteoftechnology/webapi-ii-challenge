const express = require("express");

const db = require("../data/db");

const router = express.Router();

//Get all posts
router.get("/", async (req, res) => {
  try {
    const blogs = await db.find(req.query);
    res.status(200).json(blogs);
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The posts information could not be retrieved"
    });
  }
});

//Get posts by ID
router.get("/:id", async (req, res) => {
  try {
    const blog = await db.findById(req.params.id);

    if ((blog == [])) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      res.status(200).json(blog);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "The post information could not be retrieved"
    });
  }
});

//Get post's comments
router.get("/:id/comments", async (req, res) => {
  try {
    const blog = await db.findById(req.params.id);
    if ((blog == [])) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else {
      const comments = await db.findPostComments(req.params.id);
      res.status(201).json(comments);
    }
  } catch (error) {
    res.status(500).json({
      error: "The comments information could not be retrieved"
    });
  }
});

//Add post
router.post("/", async (req, res) => {
  try {
    const blog = req.body;
    if (blog.title && blog.contents) {
      await db.insert(blog);
      res.status(201).json(blog);
    } else {
      res.status(400).json({
        message: "Please provide title and contents for the post"
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "There was an error while saving the post to the database"
    });
  }
});

//Add comment to post
router.post("/:id/comments", async (req, res) => {
  try {
    const blog = await db.findById(req.params.id);
    if (blog == []) {
      res.status(404).json({
        message: "The post with the specified ID does not exist"
      });
    } else if (!req.body.text) {
      res.status(400).json({
        errorMessage: "Please provide text for the comment"
      });
    } else {
      await db.insertComment(req.body);
      res.status(201).json(req.body.text);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      error: "There was an error while saving the comment to the database"
    });
  }
});

//Edit post
router.put('/:id', async (req, res) => {
    try {
        const id = req.params.id
        const changes = req.body
        const post = await db.findById(id)
        
        if (post == []) {
            res.status(404).json({
                message: "The post with the specified ID does not exist"
            })
        } else if (!changes.title || !changes.contents) {
            res.status(500).json({
                errorMessage: "Please provide title and contents for the post"
            })
        } else {
            await db.update(id, changes)
            res.status(201).json(changes)
        }
    } catch (error) {
        res.status(500).json({
            error: "The post information could not be modified"
        })
    }
})

//Delete post
router.delete('/:id', async (req, res) => {
    try {
        const post = await db.findById(req.params.id)
        if (post == []) {
            res.status(404).json({
                message:"The post with the specified ID does not exist"
            })
        } else {
            await db.remove(req.params.id)
            res.status(201).json({
                message: "Deleted"
            })
        }
    }  catch(error) {
        res.status(500).json({
            error: "The post could not be removed"
        })
    }
})

//Export
module.exports = router;
