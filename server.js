
// import your node modules	//const express = require('express');
const express = require('express');
const db = require('./data/db.js');
const bodyParser = require('body-parser');

// add your server code starting here
const server = express();
server.use(bodyParser.json());


server.get('/', (req, res) => {
   res.send('API running');
});


server.get('/posts', (req, res) => {
    db
    .find().then(posts => {
        res.json(posts);
    })
    .catch(err => {
        res.status(500).json({error: 'could not retrieve post information'});
    })
})

server.get('/posts/:id', (req, res) => {
   const id = req.params.id;
   db
     .findById(id)
     .then(posts => {
         if (posts.length === 0) {
             res.status(404).json({ message: 'The post with the specified ID does not exist.' })
         } else {
             res.json(posts);
         }
       })
       .catch(err => {
           res.status(500).json({ error: "The post information could not be retrieved." });
       });
})


server.post('/posts', function(req, res) {
  const { title, contents } = req.body;
  const post = req.body;

  if ( title && contents) {
    db
      .insert(post)
      .then(response => {
      res.status(201).json(response);
    })
  } else {
    res
      .status(400)
      .json({   errorMessage: "Please provide title and contents for the post."});
  }
});
server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'))
