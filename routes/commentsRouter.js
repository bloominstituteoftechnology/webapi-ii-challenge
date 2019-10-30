const router = require('express').Router();
const db = require('../data/db');

module.exports = router;

const { insertComment, findPostComments } = db;

// GET - /api/posts/:id/comments - Returns an array of all the comment objects associated with the post with the specified id.
router.get('/', async (req, res) => {
  // const postId = await findById(req.params.id)
  console.log(req);
  try {
    // const comments = await findPostComments(postId);
    // res.status(200).json(comments);
    //- If the _post_ with the specified `id` is not found:
    //  - return HTTP status code `404` (Not Found).
    //  - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.
  } catch (err) {
    res.status(500).json({
      errorMessage: 'The comments information could not be retrieved.',
      serverError: `${err}`
    });
  }

  // try {
  //   const comments = await findPostComments(postId);
  //   comments
  //     ? res.status(200).json(comments)
  // } catch (err) {
  //   // - If there's an error in retrieving the _comments_ from the database:
  //   //   - cancel the request.
  //   //   - respond with HTTP status code `500`.
  //   //   - return the following JSON object: `{ error: "The comments information could not be retrieved." }`
  //   res.status(500).json({
  //     errorMessage: 'The comments information could not be retrieved.',
  //     serverError: `${err}`
  //   });
  // }
});

// POST - /api/posts/:id/comments - Creates a comment for the post with the specified id using information sent inside of the `request body`.

// - If the _post_ with the specified `id` is not found:
//   - return HTTP status code `404` (Not Found).
//   - return the following JSON object: `{ message: "The post with the specified ID does not exist." }`.

// - If the request body is missing the `text` property:
//   - cancel the request.
//   - respond with HTTP status code `400` (Bad Request).
//   - return the following JSON response: `{ errorMessage: "Please provide text for the comment." }`.

// - If the information about the _comment_ is valid:
//   - save the new _comment_ the the database.
//   - return HTTP status code `201` (Created).
//   - return the newly created _comment_.

// - If there's an error while saving the _comment_:
//   - cancel the request.
//   - respond with HTTP status code `500` (Server Error).
//   - return the following JSON object: `{ error: "There was an error while saving the comment to the database" }`.
