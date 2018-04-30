
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
  let post = req.body;

  if ( title && contents) {


    res.status(200).json(post);
  } else {
    res
      .status(400)
      .json({  errorMessage: "Title and Content missing."});
  }
});
server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'))
