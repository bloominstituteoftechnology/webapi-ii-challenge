const router = require('express').Router();
const db = require('../data/db');

module.exports = router;

const { find, findById, insert, update, remove } = db;

// POST - /api/posts - Creates a post using the information sent inside the request body.
router.post('/', (req, res) => {
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
        .then(insertedUser => {
          res.status(200).json(insertedUser);
        })
        /*- If there's an error while saving the _post_:
            - cancel the request.
            - respond with HTTP status code `500` (Server Error).
            - return the following JSON object: `{ error: "There was an error while saving the post to the database" }`. 
        */
        .catch(err => {
          res.status(500).json({
            errorMessage:
              'There was an error while saving the post to the database',
            serverError: `${error}`
          });
        })
    : /*- If the request body is missing the `title` or `contents` property:
          - cancel the request.
          - respond with HTTP status code `400` (Bad Request).
          - return the following JSON response: `{ errorMessage: "Please provide title and contents for the post." }`.
      */
      res.status(400).json({
        errorMessage: 'Please provide title and contents for the post.'
      });
});

// GET - /api/posts - Returns an array of all the post objects contained in the database.
router.get('/', (req, res) => {
  find()
    .then(posts => {
      res.status(200).json(posts)
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
      })
    })
});
// GET -/api/posts/:id - Returns the post object with the specified id.

// DELETE - /api/posts/:id - Removes the post with the specified id and returns the deleted post object. You may need to make additional calls to the database in order to satisfy this requirement.

// PUT - /api/posts/:id - Updates the post with the specified id using data from the request body. Returns the modified document, NOT the original.
