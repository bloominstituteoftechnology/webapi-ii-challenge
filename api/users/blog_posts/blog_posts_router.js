// is in charge of urls beginning with /api/posts
const router = require("express").Router();

// import data file
const UserPosts = require("../../../data/db.js");
const {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
} = UserPosts;

// only runs if the url begins with /api/posts
// get posts
router.get("/", (req, res) => {
  res.status(200).json(channels);
});

// get post by id
router.get("/:postId", (req, res) => {
  findById()
    .then(post => {
      // if empty array
      if (post.length === 0) {
        res.status(400).json({
          message: "The post with the specified ID does not exist.",
          // otherwise send post
        });
      } else {
        res.status(200).json(post);
      }
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." }),
    );
});

// create a post
router.post("/", (req, res) => {
  const channel = req.body;
  if (channel.name) {
    // all good
    channels.push(channel);
    res.status(201).json(channels);
  } else {
    // bad data
    res.status(400).json({ message: "please provide a name for the channel" });
  }
});

// /api/posts /:id
router.delete("/:id", (req, res) => {
  res.send("deleting a channel");
});

// export default router;
module.exports = router;
