# Building RESTful APIs with Express

Topics:

* Node.js and Express.
* HTTP methods and status codes.
* Reading Request data from body, URL parameters and query string parameters.
* API design and development.

## Description

You've been focusing on client-side JavaScript thus far, but now you'll make the
transition to server-side. The goal here is to handle requests from the client
and deliver back responses. You'll develop an API to allow you to create, read,
update, and delete posts, as if you were making an application like Facebook or
Twitter.

## Instructions

You'll create an API that allows the client to create, read, update, and delete
posts. The posts will be maintained in memory as a JavaScript array. Each post
is an object in the array of the following form:

```js
{
  title: "The post title",
  contents: "The post contents"
}
```

`title` is the title of the post, as a String. `contents` contains the body
contents of the post, also as a String.

There are five main route handlers that will allow the client to read/modify the
array.

## Provided Code

We have provided a `server.js` file and a folder called `data`. Inside the data folder we have added a database with some posts already populated that you can use to test your endpoints as you build them.

Inside the data folder you'll find a file called `db.js` that has the following methods:

* find: calling find returns a promise that resolves to an array of all the posts contained in the database.
* findById: this method expects an _id_ as it's only parameter and returns the post corresponding to the _id_ provided or an empty array if no post with that _id_ is found.
* insert: calling insert passing it a post object will add it to the database and return an object with the id of the inserted post. The object looks like this: `{ id: 123 }`.
* update: accepts two arguments, the first is the id of the post to update and the second is an object with the changes to apply. It returns the count of updated records. If the count is 1 it means the record was updated correctly.
* remove: the remove method accepts an id as it's first parameter and upon successfully deleting the post from the database it returns the number of records deleted.

Server.js already has `db.js` required and ready for you to use when building your endpoints.

Please remember to run `yarn` or `npm i` to download all dependencies prior to running the server.

### `GET /posts`

When the client makes a `GET` request to `/posts`:

* If the client provides the query-string parameter `term`, filter the posts to
  those that have the `term` in their `title` or `contents` (or both), and
  send down those posts in a JSON response.
* Otherwise, send down the full array of posts as a JSON response.
* if there is an error getting the posts, return a status code of 500 and the following object: `{ message: 'Could not retrieve the posts' }`;

### `GET /posts/123`

When the client makes a `GET` request to `/posts/123` where `123` is a post id:

* If the client provides an _id_ as part of the URL, return the post that has the provided _id_.
* If there is no post with the provided _id_ return a status code of 404 (not found) and the following object: `{ message: 'post not found' }`.
* if there is an error getting the post, return a status code of 500 and the following object: `{ message: 'Could not retrieve the post' }`;

### `POST /posts`

When the client makes a `POST` request to `/posts`:

* Ensure that the client provides both `title` and `contents` in the request
  body. If any of these don't exist, send an object of the form `{ error: 'The post must have both title and a content' }` as a JSON response. Make sure to respond with an appropriate
  status code of 400 (bad request).
* If all fields are provided, create a new post object. Assign the post a
  unique, numeric `id` property that will act as its identifier, and add it to
  the posts array. Return status code 201 (created) and the newly created post object, with its assigned `id` to the client in a JSON response.
  * if there is an error creating the post, return a status code of 500 and the following object: `{ message: 'Could not create the post' }`;

### `PUT /posts/123`

When the client makes a `PUT` request to `/posts/123` where `123` is the post id:

* Ensure that the client provides `title` or `contents` in the request body. If any of these don't exist, send an object of the form `{ error: 'Please provide the new title or content' }` as a JSON response. Make sure to respond with an appropriate status code.
* If the `id` doesn't correspond to a valid post, respond with status code of 404 (not found) and the following object: `{ message: 'post not found' }`
* Modify the post with the given `id`, updating its `title` and `contents` as appropriate then return the following object: `{ updated: 1}`
* if there is an error updating the post, return a status code of 500 and the following object: `{ message: 'Could not update the post' }`;

### `DELETE /posts/123`

When the client makes a `DELETE` request to `/posts/123` where `123` is a post id:

* If the post with the provided id does not exist, return a status code of 404 and the following object: `{ message: 'post not found' }` .
* If the post exists, remove it from the array of posts and return a status code of 200 (OK) and the object `{ deleted: 1 }` in a JSON response.
* if there is an error deleting the post, return a status code of 500 and the following object: `{ message: 'Could not delete the post' }`;

## Running the API

* Use `yarn start` or `npm start` to run the server. It will restart automatically on changes.
* Test your application with [Postman](https://www.getpostman.com/).

## Stretch Goals

If you finish early, take this opportunity to access a public API. Some good ones include Twitter, Facebook, SendGrid, IBM Watson, IMDB, the Star Wars API etc. Choose one that gives you access to data or functionality that you're interested in. Figure out how to get an access token to that API, and how to use that token to authenticate requests from a node server. Use `axios` to request data from your API of choice. Once you successfully grab some data back from your API of choice, maybe render it in a React application.

Be creative here and have fun!
