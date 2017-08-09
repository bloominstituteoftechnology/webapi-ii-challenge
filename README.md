# Node.js and Express
Topics:
  * Client and server
  * Node.js and Express
  * HTTP requests and responses
  * HTTP headers and status codes
  * Request parameters
  * API design and development

## Description
You've been focusing on client-side JavaScript thus far, but now you'll make the
transition to server-side. The goal here is to handle requests from the client
and deliver back responses. You'll develop an API to allow you to create, read,
update, and delete posts, as if you were making an application like Facebook or
Twitter.

## Running the Project
- Run `npm install` to download the dependencies.
- Run `npm test` to run the tests. If you'd like, you can run `npm test:watch`
  to automatically re-reun the tests when you make modifications.
- To test your application in your browser, or by using
  [Postman](https://www.getpostman.com/), make sure you've installed `nodemon`
  via `npm install -g nodemon` and then run `nodemon src/app.js`. `nodemon` will
  keep the server running and automatically restart it if you change anything.
  You can now make requests to `http://localhost:3000` in your browser or
  Postman!
- Make modifications to `src/server.js` to make the tests pass.
- If you'd like, feel free to reference the tests in `tests/server.test.js` as
  you're developing.
- Once all tests have passed, you're done! Send us a pull request.

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

### `GET /posts`
When the client makes a `GET` request to `/posts`:

- If the client provides the query-string parameter `term`, filter the posts to
  those that have the `term` in their `title` or `contents` (or both), and
  send down those posts in a JSON response.

- Otherwise, send down the full array of posts as a JSON response.

### `POST /posts`
When the client makes a `POST` request to `/posts`:

- Ensure that the client provides both `title` and `contents` in the request
  body. If any of these don't exist, send an object of the form `{ error: "Error
  message" }` as a JSON response. Make sure to respond with an appropriate
  status code.

- If all fields are provided, create a new post object. Assign the post a
  unique, numeric `id` property that will act as its identifier, and add it to
  the posts array. Return the newly created post object, with its assigned `id`,
  to the client in a JSON response.

### `PUT /posts`
When the client makes a `PUT` request to `/posts`:

- Ensure that the client provides `id`, `title`, and `contents` in the request
  body. If any of these don't exist, send an object of the form `{ error: "Error
  message" }` as a JSON response. Make sure to respond with an appropriate
  status code.

- If the `id` doesn't correspond to a valid post, respond with an error in the
  same form as above.

- Modify the post with the given `id`, updating its `title` and `contents`.
  Respond with the newly updated post object in a JSON response.

### `DELETE /posts`
When the client makes a `DELETE` request to `/posts`:

- Ensure that the client provides an `id` in the request body, and that the `id`
  corresponds to a valid post. If there's an error, send an object of the form
  `{ error: "Error message" }` as a JSON response. Make sure to respond with an
  appropriate status code.

- Remove the post with the given `id` from the array of posts. Return the
  object `{ success: true }` in a JSON response.
