const bodyParser = require('body-parser');
const express = require('express');

const STATUS_USER_ERROR = 422;
const STATUS_OKAY = 200;

// This array of posts persists in memory across requests. Feel free
// to change this to a let binding if you need to reassign it.
let posts = [
  { id: 1, title: 'note1', contents: 'contents1' },
  { id: 2, title: 'note2', contents: 'contents2' },
  { id: 3, title: 'note3', contents: 'contents3' },
];

const server = express();
// to enable parsing of json bodies for post requests
server.use(bodyParser.json());

// TODO: your code to handle requests

server.get('/posts', (req, res) => {
  if (req.query.term) {
    const title = [];
    posts.forEach((post, index) => {
      if (
        posts[index].title.includes(req.query.term) ||
        posts[index].contents.includes(req.query.term)
      ) {
        title.push(post);
      }
    });
    res.status(STATUS_OKAY);
    res.json(title);
  } else {
    res.status(STATUS_OKAY);
    res.json(posts);
  }
});

let nextID = 4;
server.post('/posts', (req, res) => {
  if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include a Title' });
  } else if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include a Content' });
  } else {
    const note = { id: nextID++, title: req.body.title, contents: req.body.contents };
    posts.push(note);
    res.status(STATUS_OKAY);
    res.json();
  }
});

const checkID = (idToCheck) => {
  let flag = false;
  posts.forEach((post) => {
    if (post.id === idToCheck) return (flag = true);
  });
  return flag;
};

server.delete('/posts', (req, res) => {
  console.log('REQ.BODY.ID', req.body.id);
  if (!req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include an ID' });
  }

  if (!checkID(Number(req.body.id))) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "The ID You Tried to Delete Doesn's Exist or you entered a non-number" });
  }

  const id = Number(req.body.id);
  posts = posts.filter((post) => {
    console.log('POST ID', post.id !== id);
    return post.id !== id;
  });
  console.log('RESULT', posts);
  res.status(STATUS_OKAY);
  res.json();
});

const updateNote = (noteToUpdate) => {
  posts.forEach((post) => {
    if (post.id === Number(noteToUpdate.id)) {
      post.title = noteToUpdate.title;
      post.contents = noteToUpdate.contents;
      return;
    }
  });
};

server.put('/posts', (req, res) => {
  if (!req.body.id) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include an ID' });
  }
  if (!req.body.title) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include a Title' });
  }
  if (!req.body.contents) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: 'You Did Not Include Content for the Note' });
  }
  if (!checkID(Number(req.body.id))) {
    res.status(STATUS_USER_ERROR);
    res.json({ error: "The ID You Tried to Delete Doesn's Exist or you entered a non-number" });
  }
  updateNote(req.body);
  res.status(STATUS_OKAY);
  res.json();
});

module.exports = { posts, server };
