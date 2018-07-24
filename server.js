// import your node modules
const express = require('express');
const db = require('./data/db.js');
const server = express();

//middleware
server.use(express.json());

//route handlers
server.get('/', (req, res) => {

  res.send('Hello World');
});

server.get('/api/posts', (req, res) => {
	db.find()
	.then(posts => {
		res.json(posts);
	})
	.catch(err => {
		res.status(500).json({error: "Please provide title and contents for the post."});
	});
});

server.get('/api/posts/:id', (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(posts => {
      if (posts.length === 0) {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      } else {
      	res.json(posts[0]);
      }
  })
    .catch(err => {
    	res.status(500).json({  error: "The post information could not be retrieved." });
    });
});




// add your server code starting here
server.listen(3000, () => console.log('API is running'));
