const axios = require('axios');

const knex = require('knex');
const knexConfig = require('../knexfile.js');
const db = knex(knexConfig.development);

const getPostById = (id, posts) => {
  let foundPost = false;

  posts.forEach( post => {
    if (post.id == id) foundPost = post;
  });

  return foundPost;
}

test('I can get all posts', done => {
  axios.get('http://localhost:5000/api/posts')
    .then(response => {
      db('posts')
        .then(posts => {
          expect(response.data).toEqual(posts); 
          done();
        });
    })
    .catch(err => console.log(err));
});

let newPostId;


test('I can add a new post', done => {
  let newPostData = { title: 'A new Test post', contents: 'content of new test post'};
  axios.post('http://localhost:5000/api/posts', newPostData)
    .then(response => {
      newPostId = response.data.id;
      db('posts')
        .then(posts => {
          let newPost = getPostById(newPostId, posts);
          expect(newPost.contents).toEqual(response.data.contents); 
          done();
        });
    })
    .catch(err => console.log(err));
});

test('I can search for a post', done => {
  axios.get(`http://localhost:5000/api/posts/${newPostId}`)
    .then(response => {
      db('posts')
        .then(posts => {
          let foundPost = getPostById(newPostId, posts);
          expect(foundPost.contents).toEqual(response.data.contents); 
          done();
        });
    })
    .catch(err => console.log(err));
});

test('I can update a post', done => {
  let updatedPostData = { title: 'An updated Test post', contents: 'this post has been updated'};
  axios.put(`http://localhost:5000/api/posts/${newPostId}`, updatedPostData)
    .then(response => {
      db('posts')
        .then(posts => {
          let foundPost = getPostById(newPostId, posts);
          expect(foundPost.contents).toBe(updatedPostData.contents); 
          done();
        });
    })
    .catch(err => console.log(err));
});

test('I can delete a post', done => {
  axios.delete(`http://localhost:5000/api/posts/${newPostId}`)
    .then(response => {
      db('posts')
        .then(posts => {
          let foundPost = getPostById(newPostId, posts);
          expect(foundPost).toBe(false); 
          done();
        });
    })
    .catch(err => console.log(err));
});

