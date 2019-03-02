const express = require("express");
const router = express.Router();

const db = require("../data/db");

router.get("/", async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (e) {
    res
      .status(500)
      .json({ error: "The posts information could not be retrieved." });
  }

  // db.find()
  //   .then(posts => {
  //     res.status(200).json(posts);
  //   })
  //   .catch(error =>
  //     res
  //       .status(500)
  //       .json({ error: "The posts information could not be retrieved." })
  //   );
});

// destructure request object to grab the body then alias it as post
router.post("/", async ({ body: post }, res) => {
  //if the title or the contents are missing them send an error
  try {
    if (!post.title || !post.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      const { id } = await db.insert(post);
      const newPost = await db.findById(id);
      res.status(201).json(newPost);
    }
  } catch (e) {
    res.status(500).json({
      error: e
    });
  }

  // !post.title || !post.contents
  //   ? res.status(400).json({
  //       errorMessage: "Please provide title and contents for the post."
  //     })
  //   : db
  //       .insert(post)
  //       .then(({ id }) => {
  //         db.findById(id).then(post => {
  //           res.status(201).json(post);
  //         });
  //       })
  //       .catch(error =>
  //         res.status(500).json({
  //           error: "There was an error while saving the post to the database"
  //         })
  //       );
});

//and get a single post by it's ID
//destructure the request object
router.get("/:id", async ({ params: { id } }, res) => {
  const post = await db.findById(id);
  try {
    if (post.length) {
      res.status(200).json(post);
    } else {
      res.status(404).json({
        message: "The post with the specified ID does not exist."
      });
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: "The post information could not be retrieved." });
  }

  // db.findById(id)
  //   .then(post => {
  //     post.length > 0
  //       ? res.status(200).json(post)
  //       : res.status(404).json({
  //           message: "The post with the specified ID does not exist."
  //         });
  //   })
  //   .catch(error =>
  //     res
  //       .status(500)
  //       .json({ error: "The post information could not be retrieved." })
  //   );
});

router.delete("/:id", async ({ params: { id } }, res) => {
  const count = await db.remove(id);
  try {
    if (count) {
      res.status(200).json({ message: "Post Was Successfully Deleted" });
    } else {
      res
        .status(404)
        .json({ message: "The post with the specified ID does not exist." });
    }
  } catch (e) {
    res.status(500).json({ error: "The post could not be removed" });
  }

  // db.remove(id)
  //   .then(count => {
  //     console.log(count);
  //     count < 1
  //       ? res
  //           .status(404)
  //           .json({ message: "The post with the specified ID does not exist." })
  //       : res.status(200).json({ message: "Post Was Successfully Deleted" });
  //   })
  //   .catch(error =>
  //     res.status(500).json({ error: "The post could not be removed" })
  //   );
});

/*look I get that async await makes stuff look more like synchronous code
but, to be completely honest I think it's kind of ugly
because I feel using the try catches and the if else's add  more braces
which, to me feels like more cognitive loan
*/
router.put("/:id", async ({ params: { id }, body }, res) => {
  try {
    //if the body doesn't have the correct values
    if (!body.title || !body.contents) {
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
    } else {
      //returns how many were updated
      const count = await db.update(id, body);
      if (count) {
        const post = await db.findById(id);
        res.status(200).json(post);
      } else {
        res.status(404).json({
          message: "The post with the specified ID does not exist."
        });
      }
    }
  } catch (e) {
    res
      .status(500)
      .json({ error: "The post information could not be modified." });
  }

  //if the body has all the correct values
  // !body.title || !body.contents
  //   ? res.status(400).json({
  //       errorMessage: "Please provide title and contents for the post."
  //     })
  //   : db
  //       .update(id, body)
  //       .then(count => {
  //         //if a post was updated
  //         count > 0
  //           ? db.findById(id).then(post => {
  //               res.status(200).json(post);
  //             })
  //           : res.status(404).json({
  //               message: "The post with the specified ID does not exist."
  //             });
  //       })
  //       .catch(error =>
  //         res
  //           .status(500)
  //           .json({ error: "The post information could not be modified." })
  //       );
});

module.exports = router;
