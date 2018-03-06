const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
const posts = [
  {
    title: 'Going to the country',
    contents: 'Going to eat me a lot of peaches'
  },
  {
    title: '*Moving to the country',
    contents: 'it\'s "moving" you idiot, not going'
  },
  {
    title: 'I hate that song',
    contents: 'It\'s so cheesy'
  },
  /**
   * {
   * title: "The post title",
   * contents: "The post contents"
   * }
   */
];


const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests
server.get('/posts', (req, res) => {
  const term = req.query.term;
  // console.log('term: ', term);
  const searchArray = posts.filter((post) => {
    return (
      post.title.toLowerCase().split(' ').includes(term.toLowerCase()) ||
      post.contents.toLowerCase().split(' ').includes(term.toLowerCase())
    );
  });
  // console.log(searchArray);
  res.json(searchArray);
  /**
   * - If the client provides the query-string parameter `term`, filter the posts to
   those that have the `term` in their `title` or `contents` (or both), and
   send down those posts in a JSON response.
   */
});

module.exports = { posts, server };
