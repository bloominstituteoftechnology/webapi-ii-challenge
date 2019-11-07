const express = require("express");
const db = require("./data/db.js");
const server = express();
const cors = require("cors");

server.listen(4000, () =>
  console.log("============= Listening on port 4000 =============")
);

server.use(express.json());
server.use(cors());

//INSERT NEW POST
server.post("/api/posts", (req, res) => {
  const postInfo = req.body;

  !postInfo.title || !postInfo.contents
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      })
    : db
        .insert(postInfo)
        .then(post => res.status(201).json({ post: post }))
        .catch(err =>
          res.status(500).json({
            error: "There was an error while saving the post to the database"
          })
        );
});

//INSERT NEW COMMENT ON POST
server.post("/api/posts/:id/comments", (req, res) => {
  const commentInfo = req.body;
  if (!commentInfo.text)
    res
      .status(400)
      .json({ errorMessage: "Please provide text for the comment." });

  db.findById(commentInfo.post_id).then(post =>
    post.length === 0
      ? res
          .status(404)
          .json({ message: "The post with the specified ID does not exist." })
      : db
          .insertComment(commentInfo)
          .then(comment => res.status(201).json({ comment: comment }))
          .catch(err =>
            res.status(500).json({
              error:
                "There was an error while saving the comment to the database"
            })
          )
  );
});

//GET ALL POSTS
server.get("/api/posts", (req, res) => {
  db.find().then(posts => {
    !posts || posts.length === 0
      ? res
          .status(500)
          .json({ error: "The posts information could not be retrieved" })
      : res.status(200).json({ posts: posts });
  });
});

//GET POST BY ID
server.get("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .first()
    .then(post => {
      !post
        ? res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        : res.status(200).json({ post: post });
    })
    .catch(err =>
      res
        .status(500)
        .json({ error: "The post information could not be retrieved." })
    );
});

//GET POST COMMENTS
server.get("/api/posts/:id/comments", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .first()
    .then(post => {
      !post
        ? res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        : db
            .findPostComments(id)
            .first()
            .then(comments => {
              !comments
                ? res
                    .status(200)
                    .json({ message: "There are no comments on this post." })
                : res.status(200).json({ comments: comments });
            });
    });
});

//DELETE POST
server.delete("/api/posts/:id", (req, res) => {
  const { id } = req.params;

  db.findById(id)
    .first()
    .then(post => {
      !post
        ? res
            .status(404)
            .json({ message: "The post with the specified ID does not exist." })
        : db.remove(id).then(() => res.end());
    })
    .catch(err =>
      res.status(500).json({ error: "The post could not be removed." })
    );
});

//UPDATE POST
server.put("/api/posts/:id", (req, res) => {
  const { id } = req.params;
  const newInfo = req.body;

  !req.body.title || !req.body.contents
    ? res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      })
    : db
        .findById(id)
        .first()
        .then(post =>
          !post
            ? res.status(404).json({
                message: "The post with the specified ID does not exist."
              })
            : db
                .update(id, newInfo)
                .then(post => res.status(200).json({ post: post }))
                .catch(err =>
                  res.status(500).json({
                    error: "The post information could not be modified."
                  })
                )
        )
        .catch(err =>
          res
            .status(500)
            .json({ error: "Could not retrieve the specified post." })
        );
});
