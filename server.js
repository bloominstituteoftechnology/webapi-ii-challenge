// import your node modules
const express = require('express');
const db = require('./data/db.js');
const cors = require('cors');


// add your server code starting here

const port = 5555;
const server = express();

server.use(cors());
server.use(express.json());

const sendUserError = (status, message, res) => {
  res.status(status).json(message);
}

// const exLogger = (req, res, next) => {

// }

server.get('/api/posts', (req, res) => {
  db.find().then(posts => {
    res.json(posts)
  })
  .catch(error => {
    sendUserError(500, { error: "The posts information could not be retrieved." }, res)
  })
})

server.post('/api/posts', (req, res) => {
  const { title, contents } = req.body;
  if(!title || !contents ){
    sendUserError(400, { errorMessage: "Please provide title and contents for the post." }, res)
    return;
  }
  db.insert({title, contents})
  .then(response => {
    res.status(201).json(response)
  })
  .catch(error => {
    sendUserError(500, { error: "There was an error while saving the post to the database" }, res)
  })
})

server.get('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  
 
  db.findById(id)  
  .then(response => {
    if(response.length === 0){
      sendUserError(404,{ message: "The post with the specified ID does not exist." }, res)
      return;
    }
    console.log(response)
    res.status(200).json(response)
  })
  .catch(error => { 
    sendUserError(500, { error: "The post information could not be retrieved." }, res)
  })
})

server.delete('/api/posts/:id', (req, res) => {
  const { id } = req.params;

  db.remove(id)
  .then(response => {
    console.log(response)
    if(response === 0){
      sendUserError(404,{ message: "The post with the specified ID does not exist." }, res)
      return;
    }
    res.status(200).json(response)
  })
  .catch(error => {
    sendUserError(500, { error: "The post could not be removed" }, res)
  })
})

server.put('/api/posts/:id', (req, res) => {
  const { id } = req.params;
  const { title, contents } = req.body;
  if(!title || !contents ){
    sendUserError(400, { errorMessage: "Please provide title and contents for the post." }, res)
    return;
  }

  db.update(id, { title, contents })
  .then(response => {
    console.log(response)
    if(response === 0){
      sendUserError(404,{ message: "The post with the specified ID does not exist." }, res)
      return;
    }
    res.status(200).json(response)
  })
  .catch(error => {
    sendUserError(500, { error: "The post could not be modified" }, res)
  })
})


server.listen(port, () => console.log(`server running on port ${port}`))