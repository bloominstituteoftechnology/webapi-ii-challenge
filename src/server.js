const request = require('request');

const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

let nextId = 0;

server.get('/posts', (req, res) => {
  const query = req.query.term;

  if (query === undefined) res.send(posts);
  else {
    res.send(
      posts.filter(
        post => post.title.includes(query) || post.contents.includes(query),
      ),
    );
  }
});

server.post('/posts', (req, res) => {
  const title = req.body.title;
  const contents = req.body.contents;

  if (title === undefined || contents === undefined) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: 'Title or contents undefined.' });
  } else {
    const newPost = { id: nextId++, title, contents };

    posts.push(newPost);
    res.send(newPost);
  }
});

server.put('/posts', (req, res) => {
  const id = req.body.id;
  const title = req.body.title;
  const contents = req.body.contents;

  if (id === undefined || title === undefined || contents === undefined) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: 'ID, title, or contents undefined.' });
  } else {
    const editPost = posts.find(post => post.id === id);

    if (editPost === undefined) {
      res
        .status(STATUS_USER_ERROR)
        .send({ error: `Post with ID -${id}- not found.` });
    } else {
      editPost.title = title;
      editPost.contents = contents;
      res.send(editPost);
    }
  }
});

server.delete('/posts', (req, res) => {
  const id = req.body.id;

  const postsLength = posts.length;

  posts = posts.filter(post => post.id !== id);

  if (posts.length === postsLength) {
    res
      .status(STATUS_USER_ERROR)
      .send({ error: `Post with ID -${id}- not found.` });
  } else res.send({ success: true });
});

/* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */
/* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ Extra Credit *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */
/* *~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~*~ */

const me = {};

server.get('/dota2/me', (req, res) => {
  const profileId = 'INSERT_PROFILE_ID_HERE';
  const URL = `https://api.opendota.com/api/players/${profileId}`;

  request(URL, (error, response, body) => {
    me.data = JSON.parse(response.body);

    me.data.profile.account_id = 0;
    me.data.profile.personaname = 'EE';
    me.data.profile.steamid = 0;
    me.data.profile.avatar = '';
    me.data.profile.avatarmedium = '';
    me.data.profile.avatarfull = '';
    me.data.profile.profileurl = '';

    if (me.data.solo_competitive_rank !== 9999) {
      me.data.solo_competitive_rank = 9999;
    }

    if (me.data.competitive_rank !== 9999) {
      me.data.competitive_rank = 9999;
    }

    if (me.data.rank_tier !== 9999) {
      me.data.rank_tier = 9999;
    }

    if (me.data.mmr_estimate.estimate !== 9999) {
      me.data.mmr_estimate.estimate = 9999;
    }

    res.status(response.statusCode).send(me.data);
  });
});

const yelpK = 'INSERT_API_KEY_HERE';

server.get('/yelp/:query/:city', (req, res) => {
  const baseURL = 'https://api.yelp.com/v3/businesses/search';
  const q = req.params.query;
  const city = req.params.city;

  request
    .get(`${baseURL}?term=${q}&location=${city}`, (err, response, body) => {
      res.status(response.statusCode).send(
        JSON.parse(response.body).businesses.map((business, i) => {
          return business.name;
        }),
      );
    })
    .auth(null, null, true, yelpK);
});

module.exports = { posts, server };
