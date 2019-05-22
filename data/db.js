const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

module.exports = {
  find,
  findById,
  insert,
  update,
  remove,
  findPostComments,
  findCommentById,
  insertComment,
};

function find() {
  return db('posts');
}

function findById(id) {
  return db('posts').where({ id: Number(id) });
}

function insert(post) {
  return db('posts')
    .insert(post)
    .then(ids => ({ id: ids[0] }));
}

function update(id, post) {
  return db('posts')
    .where('id', Number(id))
    .update(post);
}

function remove(id) {
  return db('posts')
    .where('id', Number(id))
    .del();
}

function findPostComments(postId) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('post_id', postId);
}

function findCommentById(id) {
  return db('comments')
    .join('posts', 'posts.id', 'post_id')
    .select('comments.*', 'title as post')
    .where('comments.id', id);
}

function insertComment(comment) {
  return db('comments').insert(comment).then(ids => ({ id: ids[0] }));
}






// The `data` folder contains a database populated with test `posts`.

// Database access will be done using the `db.js` file included inside the `data` folder.

// The `db.js` publishes the following methods:

// - `find()`: calling find returns a promise that resolves to an array of all the `posts` contained in the database.
// - `findById()`: this method expects an `id` as it's only parameter and returns the post corresponding to the `id` provided or an empty array if no post with that `id` is found.
// - `insert()`: calling insert passing it a `post` object will add it to the database and return an object with the `id` of the inserted post. The object looks like this: `{ id: 123 }`.
// - `update()`: accepts two arguments, the first is the `id` of the post to update and the second is an object with the `changes` to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
// - `remove()`: the remove method accepts an `id` as its first parameter and upon successfully deleting the post from the database it returns the number of records deleted.
// - `findPostComments()`: the findPostComments accepts a `postId` as its first parameter and returns all comments on the post associated with the post id. 
// - `findCommentsById()`: accepts an `id` and returns the comment associated with that id. 
// - `insertComment()`: calling insertComment while passing it a `comment` object will add it to the database and return an object with the `id` of the inserted comment. The object looks like this: `{ id: 123 }`. This method will throw an error if the `post_id` field in the `comment` object does not match a valid post id in the database.  

// Now that we have a way to add, update, remove and retrieve data from the provided database, it is time to work on the API.

// ### Blog Post Schema

// A Blog Post in the database has the following structure:

// ```js
// {
//   title: "The post title", // String, required
//   contents: "The post contents", // String, required
//   created_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
//   updated_at: Mon Aug 14 2017 12:50:16 GMT-0700 (PDT) // Date, defaults to current date
// }
// ```