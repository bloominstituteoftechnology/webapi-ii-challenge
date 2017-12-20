const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
// const posts = [];

class Posts {
  constructor() {
    this.posts = [];
    this.currentID = 0;
  }
  get() {
    return this.posts;
  }
  add(post) {
    post.id = this.generateID();
    this.posts = [...this.posts, post];
    return this.posts;
  }
  delete(id) {
    this.posts = this.posts.filter(post => Number(post.id) !== Number(id));
    return this.posts;
  }
  search(term) {
    const posts = this.posts.filter(post => {
        return (post.title.toLowerCase().includes(term.toLowerCase()) || post.contents.toLowerCase().includes(term.toLowerCase));
    });
    return posts;
  }
  exists(id) {
    const postExists = this.posts.reduce((exists, post) => (Number(post.id) === Number(id) || exists), false);
    return postExists;
  }
  update(id, body) {
    this.posts = this.posts.map(post => Number(id) === Number(post.id) ? { ...post, ...body } : post);
  }
  generateID() {
    return ++this.currentID;
  }
}

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

module.exports = { Posts, server };
