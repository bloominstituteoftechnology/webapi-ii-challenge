
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
server.put('/posts/:id', (req, res) => {
    const { id } = req.params;
    const update = req.body;
    const { title, contents } = req.body;

if (!title || !contents) {
    res.status(400).json({
      errorMessage: "Please provide title and contents for the post."
    });
  }
    db.update(id, update)
    .then(count => {
        if (count > 0) {
            res.status(200).json({ msg: 'updated successfully' })
        } else {
            res.status(404).json({ msg: 'post not found'});
        }
    })
    .catch(err => {
        res.status(500).json(err)
    })
})


server.delete('/posts/:id', (req, res) => {
  const id = req.params.id;
  db
    .findById(id)
    .then(response => {
      if (response.length > 0) {
        const post = { ...response[0] };
        db.remove(id).then(resp => {
          res.status(200).json(post);
        });
      } else {
        res.status(404).json({ message: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({error: "The post could not be removed"});
    });
});
server.listen(5000, () => console.log('\n== API running on port 5000 ==\n'))
