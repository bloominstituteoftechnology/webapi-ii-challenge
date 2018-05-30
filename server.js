// import your node modules
const express = require('express');
const db = require('./data/db.js');
const app = express();
const port = 5000;

const errorHandler = (status, message, res) => {
  return res.status(status).json({ error: message});
}

// add your server code starting here
app.get('/api/posts', (req, res) => {
  db.find()
  .then(posts => {
    res.json({ posts})
  })
  .catch(error => {
    errorHandler(500, "The posts information could not be retrieved.", res);
  })
})

app.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.findById(id)
  .then(post => {
    if(post.length === 0) {
      errorHandler(404, "The post with the specified ID does not exist.", res);
    } 
    else {
      res.json({ post })
    }
  })
  .catch(error => {
    errorHandler(500, "The post information could not be retrieved.", res);
  })
})

app.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if(!title || !contents){
    errorHandler(400, "Please provide title and contents for the post.", res);
  } 
  else {
  db.insert({ title, contents })
  .then(response => {
    res.status(201).json(response);
  })
  .catch(error => {
    errorHandler(500, "There was an error while saving the post to the database.", res);
  })
  }
})

app.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  db.remove(id)
  .then(response => {
    if(response === 0) {
      errorHandler(404, "The post with the specified ID does not exist.", res);
    } 
    else {
      res.json({ response });
    }
  })
  .catch(error => {
    errorHandler(500, "The post could not be removed.", res);
  })
})

app.put('/api/posts/:id', (req, res) => {
  const { title, contents } = req.body;
  const { id } = req.params;
  if ( !title || !contents ) {
    errorHandler(400, "Please provide title and contents for the post.", res);
  } 
  else {
  db.update(id, { title, contents})
  .then(response => {
    if(response === 0) {
      errorHandler(404, "The post with the specified ID does not exist.", res);
    } 
    else {
      db.findById(id)
      .then(post => {
        res.json({ post })
      })
      .catch(error => {
        errorHandler(500, "The post information could not be retrieved.", res);
      })
    }
  })
  .catch(error => {
    errorHandler(500, "The post information could not be modified.", res);
  })
  }
})

app.listen(port, () => console.log(`The server at port: ${port} has started`))