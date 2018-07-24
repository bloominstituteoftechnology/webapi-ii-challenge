// import your node modules
const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.listen(8000, () => console.log('listening on Port 8000'));

const errorMessages = {
  getAll: {
    database: {
      message: 'The posts information could not be retrieved.',
      code: 500,
    },
  },
  getById: {
    database: {
      message: 'The post information could not be retrieved."',
      code: 500,
    },
    notFound: {
      message: 'The post with the specified ID does not exist.',
      code: 404,
    },
  },
  post: {
    incomplete: {
      message: 'Please provide title and contents for the post',
      code: 400,
    },
    database: {
      message: 'There was an error while saving the post to the database.',
      code: 500,
    },
  },
  delete: {
    notFound: {
      message: 'The post with the specified ID does not exist.',
      code: 404,
    },
    database: {
      message: 'The post could not be removed.',
      code: 500,
    },
  },
  put: {
    notFound: {
      message: 'The post with the specified ID does not exist.',
      code: 404,
    },
    database: {
      message: 'The post could not be modified.',
      code: 500,
    },
    incomplete: {
      message: 'Please provide title and contents for the post',
      code: 400,
    },
  },

};

app.post('/api/posts', async (req, res) => {
  const post = req.body;
  if (
    !post.title || 
    !post.contents || 
    post.title === '' || 
    post.contents === ''
  ) {
    const { code, message } = errorMessages.post.incomplete;
    res.status(code).json(message);
    return;
  }
  try {
    const dbResponse = await db.insert(req.body);
    res.status(201).json(dbResponse);
  }
  catch(err) {
    const { message, code } = errorMessages.post.database;
    res.status(code).json({ err: message });
  }
});

app.get('/api/posts/:id', async (req, res) => {
  try {
    const dbResponse = await db.findById(req.params.id);
    if (dbResponse.length === 0) {
      const { message, code } = errorMessages.getById.notFound;
      res.status(code).json({ err: message });
      return;
    }
    const { title, contents } = dbResponse[0];
    res.status(200).json({ title, contents });

  }
  catch (err) {
    const { message, code } = errorMessages.getById.database;
    res.status(code).json({ err: message });
  }
});

app.delete('/api/posts/:id', async (req, res) => {
  try {
    const dbResponse = await db.remove(req.params.id);
    if (dbResponse === 0) {
      const { message, code } = errorMessages.delete.notFound;
      res.status(code).json({ err: message });
    } else {
      res.status(200).json({ id: req.params.id });
    }
  }
  catch (err) {
    const { message, code } = errorMessages.delete.database;
    res.status(code).json({ err: message });
  }
});

app.put('/api/posts/:id', async (req, res) => {
  const {
    params: { id },
    body,
  } = req;
  const post = body;
  if (!post.title || !post.contents || post.title === '' || post.contents === '') {
    const { code, message } = errorMessages.put.incomplete;
    res.status(code).json(message);
    return;
  }

  try {
    const dbPromise = await db.update(id, body);
    if (dbPromise === 0) {
      const { message, code } = errorMessages.put.notFound;
      res.status(code).json({ err: message });
    }
    const dbPromise2 = await db.findById(id);
    const {
      title, contents,
    } = dbPromise2[0];
    res.status(200).json({
      title, contents,
    });
  }
  catch (err) {
    const { message, code } = errorMessages.put.database;
    res.status(code).json({ err: message });
  }
});
