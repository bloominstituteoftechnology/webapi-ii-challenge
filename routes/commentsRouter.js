const router = require('express').Router();
const db = require('../data/db')

module.exports = router;

const {}


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

// GET - /api/posts/:id/comments - Returns an array of all the comment objects associated with the post with the specified id. 

// GET - /api/posts/:id/comments/:id - Returns the comment object with the specified id