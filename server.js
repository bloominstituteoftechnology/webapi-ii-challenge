// import your node modules

const db = require('./data/db.js');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const server = express();

const sendUserError = (status, errorMessage, res) => {
  res.status(status).json({errorMessage: errorMessage});
  return;
}

server.use(express.json());
server.use(bodyParser.json());
// add your server code starting here
server.get('/api/posts', (req, res) => {
  db.find().then(response => {
    res.status(200).json(response);
  }).catch(err => {
    res.status(500).json({errorMessage: "The posts could not be retrieved"});
  })
});

server.get('/api/posts/:id', (req, res) => {
  db.findById(req.params.id).then(response => {
    if (response.length > 0) {
    res.status(200).json(response)
  } else {
    sendUserError(404, "The post with the specified ID does not exist.", res);
    return;
  }
}).catch(err => {
  sendUserError(500, err, res);
  return;
})
});

server.post('/api/posts/', (req, res) => {
  const {title, contents} = req.body;
  if (!(title && contents)) {
    sendUserError(400, "Please provide title and contents for the post.", res);
    return;
  }
  db.insert({title, contents}).then(response => {
    db.findById(response.id).then(response => {
      res.status(201).json(response);
    }).catch(err => {
      sendUserError(500, "The post with the specified ID does not exist.", res);
      return;
    })

  }).catch(err => {
    sendUserError(500, "There was an error while saving the post to the database", res);
    return;
  })
});

server.delete('/api/posts/:id', (req, res) => {
  db.remove(req.params.id).then(response => {
    console.log('resfafw', response);
    if (response === 0) {
      sendUserError(404, "The post with the specified ID does not exist.", res);
      return;
    }
      res.status(200).json(response);

  }).catch(err => {
    sendUserError(500, err, res);
    return;
  })
})

server.put('/api/posts/:id', (req, res) => {
  const {title, contents} = req.body;
  if (!(title && contents)) {
    sendUserError(400, "Please provide title and contents for the post.", res);
    return;
  }
  db.update(req.params.id, {title, contents}).then(response => {
    if (response === 0) {
      sendUserError(404, "The post with the specified ID does not exist.", res);
      return;
    }
    db.findById(req.params.id).then(response => {
      res.status(200).json(response)
    })
  }).catch(err => {
    sendUserError(500, "The post could not be removed", res)
  })
});

server.listen(8000, () => console.log('App is listening...'));
