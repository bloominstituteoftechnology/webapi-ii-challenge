const express = require("express");
const router = express.Router();
const Posts = require("./db.js");

router.post("/", async (req, res) => {
    const newPost = req.body;
    const { title, contents } = req.body;

    if (title && contents) {
        try {
            const post = await Posts.insert(newPost);
            console.log(newPost);
            const addedPost = await Posts.findById(post.id);
            res.status(201).json(addedPost);
        } catch (err) {
            console.log(err);
            res.status(400).json({
                message: "Please provide title and contents for the post."
            });
        }
    } else {
        res.status(500).json({
            message: "There was an error while saving the post to the database."
        });
    }
});

router.post("/:id/comments", async (req, res) => {
    const commentInfo = { ...req.body, post_id: req.params.id };
    try {
        if (!commentInfo.text) {
            res.status(400).json({
                message: "Please provide text for the comment."
            });
        } else if (!(await Posts.findById(commentInfo.post_id))) {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        } else {
            const comment = await Posts.insertComment(commentInfo);
            const addedComment = await Posts.findCommentById(comment.id);
            res.status(201).json(addedComment);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:
                "There was an error while saving the comment to the database."
        });
    }
});

router.get("/", async (req, res) => {
    try {
        const posts = await Posts.find(req.query);
        res.status(200).json(posts);
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "The posts information could not be retrieved."
        });
    }
});

router.get("/:id", async (req, res) => {
    try {
        const post = await Posts.findById(req.params.id);
        if (post) {
            console.log(post);
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message: "The posts information could not be retrieved."
        });
    }
});

router.get("/:id/comments", async (req, res) => {
    try {
        const comments = await Posts.findPostComments(req.param.id);
        if (comments.length) {
            res.status(200).json(comments);
        } else {
            res.status(500).json({
                message: "The comments information could not be retrieved."
            });
        }
    } catch (err) {
        console.log(err);
        res.status(404).json({
            message: "The posts information could not be retrieved."
        });
    }
});

router.delete("/:id", async (req, res) => {
    try {
        const post = await Posts.remove(req.params.id);

        if (post) {
            res.status(200).json(post);
        } else {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        }
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "The post could not be removed."
        });
    }
});

// router.put("/:id", async (req, res) => {
//     const updatedPost = req.body;
//     const { title, contents } = req.body;

//     if (title && contents) {
//         try {
//             const post = await Posts.update(req.params.id, updatedPost);
//             console.log(updatedPost);
//             const addingUpdatedPost = await Posts.findById(post.id);
//             console.log(addingUpdatedPost );
//             res.status(200).json(addingUpdatedPost);
//         } catch (err) {
//             console.log(err);
//             res.status(400).json({
//                 message: "Please provide title and contents for the post."
//             });
//         }
//     } else {
//         res.status(500).json({
//             err: "The post information could not be modified."
//         });
//     }
// });

router.put("/:id", async (req, res) => {
    const updatedPost = req.body;
    const postId = req.params.id;
    const { title, contents } = req.body;
    try {
        if (!title && contents) {
            res.status(400).json({
                message: "Please provide title and contents for the post."
            });
        } else if (!(await Posts.findById(postId))) {
            res.status(404).json({
                message: "The post with the specified ID does not exist."
            });
        } else {
            const post = await Posts.update(postId, updatedPost);
            console.log(updatedPost);
            const addingUpdatedPost = await Posts.findById(postId);
            console.log(addingUpdatedPost);
            res.status(200).json(addingUpdatedPost);
        }
    } catch (err) {
        console.log(err);
        res.status(500).json({
            message:
                "There was an error while saving the comment to the database."
        });
    }
});

module.exports = router;
