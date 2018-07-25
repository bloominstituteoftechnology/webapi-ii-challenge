// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');
//const bodyParser = require('body-parser');

const server = express();

const sendUserError = (status, errorMessage, res) => {
  res.status(status).json({
    errorMessage: errorMessage
  });
}

server.use(express.json());
//server.use(bodyParser.json());
server.use(cors());
// add your server code starting here
server.get('/api/posts', async (req, res) => {
  try {
    const posts = await db.find();
    res.status(200).json(posts);
  } catch (err) {
    res.status(500).json({
      errorMessage: "The posts could not be retrieved",
      err: err
    });
  }
});

server.get('/api/posts/:id', async (req, res) => {
  try {
    const post = await db.fondById(req.params.id);
    if (post.length > 0) {
      res.status(200).json(post);
    } else {
      sendUserError(404, "The post with the specified ID does not exist.", res);
    }
  } catch (err) {
    sendUserError(500, `Server Error: ${err}`, res);
  }
});

server.post('/api/posts/', async (req, res) => {
  const {
    title,
    contents
  } = req.body;

  if (!(title && contents)) {
    sendUserError(400, "Please provide title and contents for the post.", res);
    return;
  }

  try {
    const newPostId = await db.insert({title, contents});
    try {
    const newPost = await db.findById(newPostId.id);
    res.status(201).json(newPost);
  } catch(err) {
    sendUserError(404, "The post with the specified ID does not exist", res);
    return;
  }

  } catch(err) {
    sendUserError(500, "There was an error while saving the post to the database", res);
    return;
  }
});

server.delete('/api/posts/:id', async (req, res) => {
  try {
    const result = await db.remove(req.params.id);
    if (result === 0) {
      sendUserError(404, "The post with the specified ID does not exist.", res);
      return;
    }
    res.status(200).json({
      "Result": `Post ${req.params.id} successfully deleted`
    });
  } catch (err) {
    sendUserError(500, err, res);
  }
})

server.put('/api/posts/:id', async (req, res) => {
  const {
    title,
    contents
  } = req.body;
  if (!(title && contents)) {
    sendUserError(400, "Please provide title and contents for the post.", res);
    return;
  }

  try {
    const postUpdate = await db.update(req.params.id, {title, contents});
    if (postUpdate === 0) {
      sendUserError(404, "The post with the specified ID does not exist.", res);
      return;
    }
    try {
      const updatedPost = await db.findById(req.params.id);
      res.status(200).json(updatedPost);
    } catch(err) {
      sendUserError(404, "Updated post could not be found", res);
      return;
    }
} catch(err) {
  sendUserError(500, "The post could not be updated", res)
  return;
}
});

server.listen(8000, () => console.log('App is listening...'));
