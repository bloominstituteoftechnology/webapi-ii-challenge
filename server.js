// import your node modules
const express = require('express');
const helmet = require('helmet');
const cors = require('cors');
const db = require('./data/db.js');

const server = express();
const port = 8000;

//middleware
server.use(express.json());
server.use(helmet());
server.use(cors({ origin: 'http://localhost:3000' }));



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

server.post('/api/posts', (req,res) => {
  const newPostInfo = req.body;
  db
    .insert(newPostInfo)
    .then(response => {
      res.status(201).json(response);
    })
    .catch(error => {
      if(err.error === 19){
      	res.status(400).json({ errorMessage: "Please provide title and contents for the post." });
      } else {
      	res.status(500).json({ error: "There was an error while saving the post to the database" });
      }
    });
});

server.delete('/api/posts', (req, res) => {
	const { id } = req.query;
	let post;
	db
		.findById(id)
		.then(foundPost => {
			post = { ...foundPost[0] };

	db.remove(id).then(response => {
      res.status(200).json(response);
		});
 	})
    .catch(error => {
      res.status(500).json({ error: "The post could not be removed" });
    });
});

server.put('/api/posts/:id', (req, res) => {
	const  { id } = req.params;
	const { title, contents} = req.body;
		if( !title || !contents ) {
			res.status(400).json({ error: "Please provide title and content."})
			return;
		}

	db
	 	.update(id, {title, contents} )
	 	.then(post => {
	 		if (post === 0) {
	 			res.status(404).json({ message: "The post with the specified ID does not exist."});
	 		return;
	 		} else {
	 			res.status(200).json({ post })
	 		}
	 	})
	 	.catch(err => {
	 		res.status(500).json({ error: "The post information could not be modified." })
	 	});
});




// add your server code starting here
server.listen(8000, () => console.log('API is running'));
