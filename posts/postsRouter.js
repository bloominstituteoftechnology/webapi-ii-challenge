const router = require("express").Router();
const db = require("../data/db");

module.exports = router;

const { find, findById, insert, update, remove } = db;

// POST - /api/posts - Creates a post using the information sent inside the request body.
router.post("/", (req, res) => {
  const { title, contents } = req.body;
  const newPost = { title, contents };
  title && contents
    ? /* 
        - If the information about the _post_ is valid:
            - save the new _post_ the the database.
            - return HTTP status code `201` (Created).
            - return the newly created _post_.
        */
      insert(newPost)
        .then(insertedpost => {
          res.status(200).json(insertedpost);
        })
        /*- If there's an error while saving the _post_:
            - cancel the request.
            - respond with HTTP status code `500` (Server Error).
            - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`. 
        */
        .catch(err => {
          res.status(500).json({
            errorMessage:
              "There was an error while saving the post to the database",
            serverError: `${error}`
          });
        })
    : /*- If the request body is missing the `title` or `contents` property:
          - cancel the request.
          - respond with HTTP status code `400` (Bad Request).
          - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.
      */
      res.status(400).json({
        errorMessage: "Please provide title and contents for the post."
      });
});

// GET - /api/posts - Returns an array of all the post objects contained in the database.
router.get("/", (req, res) => {
  find()
    .then(posts => {
      res.status(200).json(posts);
    })
    /* 
    - If there's an error in retrieving the _posts_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ error: "The posts information could not be retrieved." }`.
     */
    .catch(err => {
      res.status(500).json({
        errorMessage: `The posts information could not be retrieved`,
        serverError: `${err}`
      });
    });
});
// GET -/api/posts/:id - Returns the post object with the specified id.
router.get("/:id", (req, res) => {
  const { id } = req.params;

  findById(id)
    .then(post => {
      console.log(post);
      post
        ? res.status(200).json(post)
        : /* 
          - If the _post_ with the specified `id` is not found:
            - return HTTP status code `404` (Not Found).
            - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.
          */
          res.status(404).json({
            errorMessage: `The post with the specified ID does not exist.`
          });
    })
    /*
    - If there's an error in retrieving the _post_ from the database:
        - cancel the request.
        - respond with HTTP status code `500`.
        - return the following JSON object: `{ error: "The post information could not be retrieved." }`.
    */
    .catch(err => {
      res.status(500).json({
        errorMessage: `The post information could not be retrieved.`,
        serverError: `${err}`
      });
    });
});
// DELETE - /api/posts/:id - Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  remove(id)
    .then(post => {
      post
        ? res.status(204).json(`deleted`)
        : /* - If the _post_ with the specified `id` is not found:
            - return HTTP status code `404` (Not Found).
            - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.
        */
          res.status(404).json({
            errorMessage: `The post with the specified ID does not exist`
          });
    })
    /*
    - If there's an error in removing the _post_ from the database:
      - cancel the request.
      - respond with HTTP status code `500`.
      - return the following JSON object: `{ error: "The post could not be removed" }`. */
    .catch(err => {
      res.status(500).json({
        errorMessage: "The post could not be removed",
        serverError: `${err}`
      });
    });
});
// PUT - /api/posts/:id - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
router.put("/:id", (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  const post = { title, contents };

  title && contents
    ? update(id, post)
        .then(updatedPost => {
          updatedPost
            ? /*
          - If the post is found and the new information is valid:
            - update the post document in the database using the new information sent in the `request body`.
            - return HTTP status code `200` (OK).
            - return the newly updated _post_.
          */
              res.status(200).json(updatedPost)
            : /*
               - If the _post_ with the specified `id` is not found:
                 - return HTTP status code `404` (Not Found).
                 - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.
            */
              res
                .status(404)
                .json({
                  errorMessage: `The post with the specified ID does not exist.`
                });
        })
        /*
      - If there's an error when updating the _post_:
        - cancel the request.
        - respond with HTTP status code `500`.
        - return the following JSON object: `{ error: "The post information could not be modified." }`.
      */
        .catch(err =>
          res.status(500).json({
            errorMessage: `The post information could not be modified.`,
            serverError: `${err}`
          })
        )
    : /*
      - If the request body is missing the `title` or `contents` property:
        - cancel the request.
        - respond with HTTP status code `400` (Bad Request).
        - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.
      */
      res
        .status(400)
        .json({ errorMessage: `Please provide title and contents for the post.` });
});
